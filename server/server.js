const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const ws = require("ws");
const { Server } = require("socket.io");
const Games = require("./games");
const Players = require("./players");
const { prepQuestion } = require("./questions");
const { toOrdinalSuffix } = require("./utils");
const port = process.env.PORT || 3001;

//Enable cors
app.use(cors);

//Create http server
const server = http.createServer(app);

//Configure socket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
  wsEngine: ws.Server,
});

//Create Games and Players instance
const games = new Games();
const players = new Players();

//Define socket connection
io.on("connection", async (socket) => {
  //Host creates a game
  socket.on(
    "createGame",
    async ({ difficulty, numberOfQuestions, name }, callback) => {
      const game = await games.createGame(
        socket.id,
        difficulty,
        numberOfQuestions
      );

      const player = players.createPlayer(socket.id, game.gameId, name);

      //Join the room
      socket.join(game.gameId);

      io.to(game.gameId).emit("playerJoined", {
        playerId: player.playerId,
        name: player.name,
      });

      //Return the ID of the game
      return callback(game.gameId);
    }
  );

  //Player joins a game
  socket.on("joinGame", ({ gameId, name }, callback) => {
    const game = games.getGameById(gameId);
    if (game === null) {
      return callback({
        status: "Error",
        message: `Game with ID ${gameId} does not exist`,
      });
    }
    if (game.started) {
      return callback({
        status: "Error",
        message: `Game with ID ${gameId} has already started`,
      });
    }
    players.createPlayer(socket.id, game.gameId, name);

    const totalQuestions = game.questions.length;

    socket.join(game.gameId);
    game.numberOfPlayers += 1;

    const playersData = players.getPlayersByGameId(gameId);
    io.to(gameId).emit("playersData", playersData);

    return callback({ status: "Success", totalQuestions });
  });

  //Host starts the game
  socket.on("startGame", () => {
    const player = players.getPlayerById(socket.id);

    if (player) {
      //Get the current question
      let currentQuestion = games.getCurrentQuestion(player.gameId);

      //Convert to correct form
      currentQuestion = prepQuestion(currentQuestion);

      //Set the game to started
      const game = games.getGameByHostId(socket.id);
      game.started = true;

      //Emit that the host has started the game
      io.to(game.gameId).emit("hostStartedGame");

      //Send the next (current) question
      io.to(game.gameId).emit("nextQuestion", currentQuestion);
    }
  });

  //Gets the next question for the game
  socket.on("getNextQuestion", () => {
    const player = players.getPlayerById(socket.id);

    if (player) {
      //Get the current question
      let currentQuestion = games.getCurrentQuestion(player.gameId);

      //Convert to correct form
      currentQuestion = prepQuestion(currentQuestion);

      //Send the next (current) question
      io.to(player.gameId).emit("nextQuestion", currentQuestion);
    }
  });

  //Question timer ends, host emits message
  socket.on("timerEnded", () => {
    const game = games.getGameByHostId(socket.id);
    if (game) {
      endCurrentRound(game.gameId);
    }
  });

  //Player submits an answer
  socket.on("submitAnswer", (answer, time) => {
    const player = players.getPlayerById(socket.id);

    if (player) {
      //Check to see if the player answered correctly
      const game = games.getGameById(player.gameId);

      const question = game.currentQuestion;
      const correctAnswer = question.correct_answer;

      if (answer === correctAnswer) {
        //Set the player's correct status to true
        player.correct = true;

        //Calculate the player's score
        //1000 points for each correct question, plus a time bonus
        const timeTakenToAnswer = 20 - time / 4;
        const scoreAdded = 1000 * (1 - timeTakenToAnswer / 20 / 2);

        player.score += scoreAdded;
      } else {
        //Set the player's correct status to false
        player.correct = false;
      }

      //Increment the number of players answered
      game.playersAnswered += 1;

      //If all players have answered, stop the round
      if (game.playersAnswered === game.numberOfPlayers) {
        endCurrentRound(game.gameId);
      }
    }
  });

  //Getting player data for waiting page initial render
  socket.on("getPlayersData", ({ gameId }) => {
    const playersData = players.getPlayersByGameId(gameId);
    io.to(gameId).emit("playersData", playersData);
  });

  //Host leaves through home button on round end
  socket.on("hostLeft", () => {
    const player = players.getPlayerById(socket.id);

    if (player) {
      //Handle the host leaving
      handleHostDisconnect(player);
    }
  });

  //Player leaves through home button on round end
  socket.on("playerLeft", () => {
    const player = players.getPlayerById(socket.id);

    if (player) {
      //Handle the player leaving
      handlePlayerDisconnect(player, socket);
    }
  });

  socket.on("disconnect", () => {
    const player = players.getPlayerById(socket.id);

    if (player) {
      let game = games.getGameByHostId(player.playerId);

      if (game === null) {
        handlePlayerDisconnect(player, socket);
      } else {
        handleHostDisconnect(player);
      }
    }
  });
});

const endCurrentRound = (gameId) => {
  let gamePlayers = players.getPlayersByGameId(gameId);

  //Sort the player data by score
  gamePlayers.sort((a, b) => b.score - a.score);

  const playersData = gamePlayers.map((player, index) => {
    const playerData = {
      playerId: player.playerId,
      name: player.name,
      correct: player.correct,
      score: player.score,
      position: toOrdinalSuffix(index + 1),
    };

    //Reset each player's correct property to false
    player.correct = false;

    return playerData;
  });

  const game = games.getGameById(gameId);

  //Reset players answered to 0
  game.playersAnswered = 0;

  //Send back the correct answer to display
  const correctAnswer = game.currentQuestion.correct_answer;

  let gameEnded = false;

  //Check to see if we need to end the game if there's no more questions left
  if (game.questions.length === 0) {
    gameEnded = true;
  }

  io.to(gameId).emit("roundEnded", { playersData, correctAnswer, gameEnded });
};

const handlePlayerDisconnect = (player, socket) => {
  const game = games.getGameById(player.gameId);

  //Delete the player
  players.deletePlayerById(player.playerId);

  //Decrement number of players in game
  games.decrementNumberOfPlayers(game.gameId);

  //Emit new player data to room in case room is in waiting area
  //This will trigger a re-render of the list of players who joined
  const playersData = players.getPlayersByGameId(game.gameId);
  io.to(game.gameId).emit("playersData", playersData);

  //Leave the room
  socket.leave(game.gameId);
};

const handleHostDisconnect = (host) => {
  const game = games.getGameById(host.gameId);

  //Delete all players in the game
  players.deletePlayersByGame(game.gameId);

  //Delete the game
  games.deleteGameById(game.gameId);

  //Broadscast host disconnected to room
  io.to(game.gameId).emit("hostDisconnected");

  //Remove all sockets from the room
  io.in(game.gameId).socketsLeave(game.gameId);
};

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
