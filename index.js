const express = require("express");
const app = express();
const http = require("http");
const { SocketAddress } = require("net");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// import * as url from 'url';

// // const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

app.get("/", (req, res) => {
  app.use(express.static(__dirname + "/public"));
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("touch short", (message) => {
    socket.broadcast.emit("vibrate short", message);
    console.log("Vibrate short sent");
  });

  socket.on("touch long", () => {
    socket.broadcast.emit("vibrate long");
    console.log("Vibrate long sent");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
