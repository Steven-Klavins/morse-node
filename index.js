import express from "express";
import http from "http";
import { Server } from "socket.io";
import * as url from "url";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const users = new Map();

app.get("/", (req, res) => {
  app.use(express.static(__dirname + "/public"));
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("user connected", (user) => {
    socket.broadcast.emit("new user", user);
    users.set(socket.id, user);
    console.log("new user", user);
    console.log("user list", users);
  });

  socket.on("touch short", (message) => {
    socket.broadcast.emit("vibrate short", message);
    console.log("Vibrate short sent");
  });

  socket.on("touch long", (message) => {
    socket.broadcast.emit("vibrate long", message);
    console.log("Vibrate long sent");
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("del user", users[socket.id]);
    console.log("disconnect");
    users.delete(socket.id);
    console.log("users", users);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

app.get("/playground", (req, res) => {
  app.use(express.static(__dirname + "/public"));
  res.sendFile(__dirname + "/playground.html");
});
