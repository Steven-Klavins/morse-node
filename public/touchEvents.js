var touchLimit = 250;
var start;
var end;
var duration;
const socket = io();

const touchLong = () => {
  socket.emit("touch long");
};

const touchShort = () => {
  socket.emit("touch short");
};

function onTapDown() {
  document.getElementById("indication_light").style.backgroundColor = "green";
  document.getElementById("key_transmitter").src ="2.jpg"
  start = Date.now();
}

function onTapUp() {
  document.getElementById("indication_light").style.backgroundColor = "red";
  document.getElementById("key_transmitter").src ="1.jpg"
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
  touchLong();
  console.log("Long Touch sent");
}

function onShortTouch() {
  touchShort();
  console.log("Short Touch sent");
}

const listen = () => {
  socket.on("vibrate short", function () {
    window.navigator.vibrate(250);
    console.log("vibrate signal - short vib");
  });
  socket.on("vibrate long", function () {
    window.navigator.vibrate(750);
    console.log("vibrate signal - long");
  });
};
