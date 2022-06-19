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
<<<<<<< HEAD
=======
  app.use(express.static(__dirname + "/public"));
>>>>>>> bf0bef5ed3a753970194918f6116319692485f27
  res.sendFile(__dirname + "/test.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
<<<<<<< HEAD
=======
  socket.on("touch event", (short) => {
    console.log(short);
  });
>>>>>>> bf0bef5ed3a753970194918f6116319692485f27
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
