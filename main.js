var map = document.getElementById("map")

var mouseX = null;
var mouseY = null;
var mapX = 0;
var mapY = 0;
var mapScale = 1;
var deltaMouseX = null;
var deltaMouseY = null;

var originx = 0;
var originy = 0;

var mouseDown = false;
document.onmousedown = function() { 
    mouseDown = true;
}
document.onmouseup = function() {
    mouseDown = false;
}

document.addEventListener("wheel", mouseWheel);
function mouseWheel (e) {
    const wheel = e.deltaY < 0 ? 1 : -1;
    const zoom = Math.exp(wheel * 0.5);
    mapScale *= zoom;
    
    if (mapScale < 1) {mapScale = 1}
    map.style.transform = "translate("+originx+","+originy+")";

    originx -= mouseX/(mapScale*zoom) - mouseX/mapScale;
    originy -= mouseY/(mapScale*zoom) - mouseY/mapScale;
    
    map.style.transform = "scale("+mapScale+")";

    map.style.transform = "translate("+(-originx)+","+(-originy)+")";
}

document.addEventListener("mousemove", mouseMove);

function mouseMove (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    deltaMouseX = e.movementX;
    deltaMouseY = e.movementY;
    if (mouseDown) {
        mapX += deltaMouseX;
        mapY += deltaMouseY;
    }
    map.style.left = mapX+"px";
    map.style.top = mapY+"px";
}

