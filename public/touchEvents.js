var touchLimit = 250;
var start;
var end;
var duration;
const socket = io();

const touchLong = () => {
  socket.emit("touch long", {to: "Karla", from: "John" });
};

const touchShort = () => {
  socket.emit("touch short", { to: "Karla", from: "John" });
};

function onTapDown() {
  document.getElementById("indication_light").style.backgroundColor = "green";
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
  touchLong();
  console.log("Long Touch sent");
}

function onShortTouch() {
  touchShort();
  console.log("Short Touch sent");
}

var users = document.getElementById('users');

const listen = () => {
  socket.on("vibrate short", (message) => {
    console.log("vibrate short message:", message);
    window.navigator.vibrate(250);
    console.log("vibrate signal - short vibr");
  });
  
  socket.on("vibrate long", (message) => {
    console.log("vibrate long message:", message);
    window.navigator.vibrate(750);
    console.log("vibrate signal - long");
  });

  socket.on("active users", (activeUsers) => {
    console.log('Active users');
    console.log(activeUsers);
    for (var i = 0; i < activeUsers.length; i++) {
      var item = document.createElement("li");
      item.textContent = activeUsers[i];
      users.appendChild(item);
   }
 
});

var input = document.getElementById('name');
var form = document.getElementById('form');

const newUserEvent = (name) => {
  socket.emit('user connected', name);
  document.getElementsByClassName('activeUsers')[0].setAttribute("style","display:block");
  document.getElementsByClassName('mainScreen')[0].setAttribute("style","display:none");
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    newUserEvent(input.value);
  }
});

}