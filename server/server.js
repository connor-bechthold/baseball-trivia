const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
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

io.on("connection", (socket) => {
  console.log("connor");
  console.log(`User with ID ${socket.id} connected!`);

  io.on("disconnect", () => {
    console.log(`User with ID ${socket.id} disconnected!`);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
