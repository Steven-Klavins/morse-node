var touchLimit = 300;
var start;
var end;
var duration;

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
    if ( duration <= touchLimit){
        onShortTouch()
    } else {
        onLongTouch()
    }
}

function onLongTouch(){
    window.navigator.vibrate(1000);
    console.log("Long Touch sent")
}

function onShortTouch(){
    window.navigator.vibrate(500);
    console.log("Short Touch sent")
}