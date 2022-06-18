const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// import * as url from 'url';

// // const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/test.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

// import * as url from 'url';

// // const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// app.get('/', (req, res) => {
//   app.use(express.static(__dirname + "/public"))
//   res.sendFile(__dirname + '/index.html')

// })
