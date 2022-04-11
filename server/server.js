const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const Games = require("./games");
const Players = require("./players");
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

//Create Games and Players instance
const games = new Games();
const players = new Players();

//Define socket connection
io.on("connection", async (socket) => {
  console.log(`User with ID ${socket.id} connected!`);

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

  socket.on("joinGame", ({ gameId, name }, callback) => {
    const game = games.getGameById(gameId);
    if (game === null) {
      return callback({
        status: "Error",
        message: `Game with ID ${gameId} does not exist`,
      });
    }
    players.createPlayer(socket.id, game.gameId, name);

    socket.join(game.gameId);

    const playersData = players.getPlayersByGameId(gameId);
    io.to(gameId).emit("playersData", playersData);

    return callback({ status: "Success" });
  });

  socket.on("getPlayersData", ({ gameId }) => {
    const playersData = players.getPlayersByGameId(gameId);
    io.to(gameId).emit("playersData", playersData);
  });

  socket.on("disconnect", () => {
    console.log(`User with ID ${socket.id} disconnected!`);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
