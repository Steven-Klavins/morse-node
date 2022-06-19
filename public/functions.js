const socket = io();

const touch = () => {
  socket.emit("touch event", "short");
};
