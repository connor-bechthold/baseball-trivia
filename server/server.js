const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { getQuestions } = require("./utils/questions");
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
});

//Keep track of all current games and players
const games = [];
const players = [];

io.on("connection", async (socket) => {
  console.log(`User with ID ${socket.id} connected!`);

  //Client creates a game
  socket.on("createGame", async (data, callback) => {
    if (games.find((x) => x.name === data.gameName)) {
      return callback({
        status: "Error",
        message: `Room ${gameName} already exists`,
      });
    }
    //Get questions for the game
    const questions = await getQuestions(
      data.difficulty,
      data.numberOfQuestions
    );

    if (!questions) {
      return callback({
        status: "Error",
        message: "Unable to fetch questions for game",
      });
    }
    //Create the new game
    const newGame = {
      name: data.gameName,
      host: socket.id,
      questions,
    };
    games.push(newGame);

    //Create the new player
    const newPlayer = {
      name: data.playerName,
      game: data.gameName,
      id: socket.id,
      score: 0,
    };
    players.push(newPlayer);

    console.log(games);
    console.log(players);

    return callback({ status: "Success" });
  });

  io.on("disconnect", () => {
    console.log(`User with ID ${socket.id} disconnected!`);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
