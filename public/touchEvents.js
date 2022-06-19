var touchLimit = 300;
var start;
var end;
var duration;
const socket = io();

// const touch = () => {
//   socket.emit("touch event", "short");
// };

const touchLong = () => {
  socket.emit("touch event", "long");
};

const touchShort = () => {
  socket.emit("touch event", "short new");
};

function onTapDown() {
  document.getElementById("indication_light").style.backgroundColor = "green";
  // window.navigator.vibrate(200);
  start = Date.now();
}

function onTapUp() {
  document.getElementById("indication_light").style.backgroundColor = "red";
  end = Date.now();
  duration = end - start;
  console.log(duration);
  recorder(duration);
}

function recorder(duration) {
  if (duration <= touchLimit) {
    onShortTouch();
  } else {
    onLongTouch();
  }
}

function onLongTouch() {
  //   window.navigator.vibrate(1000);
  touchShort();
  console.log("Long Touch sent");
}

function onShortTouch() {
  touchShort();
  console.log("Short Touch sent");
}

const listen = () => {
  socket.on("vibrate short", function () {
    window.navigator.vibrate(500);
    console.log("vibrate signal - short vib");
  });
  socket.on("vibrate long", function () {
    console.log("vibrate signal - long");
  });
};
