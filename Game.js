"use strict";
exports.__esModule = true;
var Twin_1 = require("./Twin");
var World_1 = require("./World");
var Obstacle_1 = require("./Obstacle");
var TwinGun_1 = require("./TwinGun");
var canvasContext;
var canvas;
var player;
var world;
var actionBehavior;
var switchClass = true;
var startDrag = false;
var canChangeClass = true;
var firstDrag = true;
var toDrag = -1;
var AllowedMovement;
(function (AllowedMovement) {
    AllowedMovement[AllowedMovement["All"] = 0] = "All";
    AllowedMovement[AllowedMovement["LeftOrRight"] = 1] = "LeftOrRight";
    AllowedMovement[AllowedMovement["UpOrDown"] = 2] = "UpOrDown";
    AllowedMovement[AllowedMovement["None"] = 3] = "None";
})(AllowedMovement || (AllowedMovement = {}));
var allowedMovement = AllowedMovement.All;
var keyCode = {
    W: 87,
    S: 83,
    A: 65,
    D: 68,
    Q: 81,
    SPACE: 32
};
var mouse = {
    x: 0,
    y: 0
};
/* To store pressed keys. */
var keys = [];
window.onresize = function () {
    resizeCanvas();
    var offsetX = canvas.width / 2 - player.getX();
    var offsetY = canvas.height / 2 + player.getY();
    setCanvasOrigin(offsetX, offsetY);
};
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
function setCanvasOrigin(x, y) {
    canvasContext.translate(x, y);
    canvasContext.scale(1, -1);
}
window.onload = function () {
    initCanvas();
    setupCanvas();
    initWorld();
    initPlayer();
    renderLoop();
};
function initCanvas() {
    canvas = document.getElementById('myCanvas');
    canvasContext = canvas.getContext("2d");
    canvasContext.imageSmoothingEnabled = true;
}
function setupCanvas() {
    resizeCanvas();
    setCanvasOrigin(canvas.width / 2, canvas.height / 2);
}
function initPlayer() {
    actionBehavior = new TwinGun_1.TwinGun(canvasContext, world);
    player = new Twin_1.Twin(world);
    world.add(player);
    canvas.addEventListener('mousedown', function () {
        toDrag = world.obstacleInMouse(mouse.x, mouse.y, canvas.width / 2, canvas.height / 2);
        if (toDrag != -1) {
            startDrag = true;
        }
    });
    canvas.addEventListener('mouseup', function () {
        if (startDrag) {
            startDrag = false;
            firstDrag = true;
        }
    });
}
function initWorld() { world = new World_1.World(canvasContext); }
function renderLoop() {
    updatePositions();
    clearCanvas();
    render();
    window.requestAnimationFrame(function () { return renderLoop(); });
}
function render() {
    renderWorld();
    renderPlayer();
    renderBullets();
}
function renderWorld() {
    world.drawBoundary();
    world.drawObstacles();
}
function renderBullets() {
    if (actionBehavior.thereAreBulletsFired()) {
        actionBehavior.renderBullets(player.getX(), player.getY());
    }
}
function renderPlayer() {
    //offsetX and offsetY to calculate the angle between mouse and tank.
    var offsetX = mouse.x - canvas.width / 2;
    var offsetY = mouse.y - canvas.height / 2;
    player.display(canvasContext, offsetX, offsetY);
}
function clearCanvas() {
    canvasContext.save();
    canvasContext.resetTransform();
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.restore();
}
document.onkeydown = function (e) { keys[e.which] = true; };
document.onkeyup = function (e) { keys[e.which] = false; };
function updatePositions() {
    if (keys[keyCode.W]) {
        player.moveUp();
        world.moveDown();
    }
    if (keys[keyCode.S]) {
        player.moveDown();
        world.moveUp();
    }
    if (keys[keyCode.A]) {
        player.moveLeft();
        world.moveRight();
    }
    if (keys[keyCode.D]) {
        player.moveRight();
        world.moveLeft();
    }
    if (keys[keyCode.SPACE]) {
        actionBehavior.fire(player.getX(), world.getX(), player.getY(), world.getY(), player.getAngle());
    }
    if (keys[keyCode.Q]) {
        // if (canChangeClass) {
        //let x = player.getX()
        //let y = player.getY()
        //let velX = player.getVelocityX()
        //let velY = player.getVelocityY()
        //if (switchClass) {
        //    actionBehavior = new RocketGun(canvasContext, world)
        //    player = new Destroyer(world)
        //   switchClass = !switchClass
        //} else if (!switchClass) {
        //    actionBehavior = new TwinGun(canvasContext, world)
        //    player = new Twin(world)
        //    switchClass = !switchClass
        //}
        //player.setX(x)
        //player.setY(y)
        //player.setVelocityX(velX)
        //player.setVelocityY(velY)
        //canChangeClass = false
        //setTimeout(function wait() { canChangeClass = true }, 1000)
        //}
    }
    allowedMovement = player.updateState();
    updateWorldState();
    updateBulletsPosition();
}
function updateWorldState() {
    world.updateState();
    if (allowedMovement === AllowedMovement.All) {
        canvasContext.translate(0, world.getVelocityY());
        canvasContext.translate(world.getVelocityX(), 0);
    }
    else if (allowedMovement === AllowedMovement.LeftOrRight) {
        canvasContext.translate(world.getVelocityX(), 0);
    }
    else if (allowedMovement === AllowedMovement.UpOrDown) {
        canvasContext.translate(0, world.getVelocityY());
    }
}
function updateBulletsPosition() {
    actionBehavior.updateBulletsPosition();
}
//Scostamento tra bound ostacolo e mouse
var deltaX = 0;
var deltaY = 0;
window.onmousemove = function (e) {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    if (startDrag && world.obstacles[toDrag] != undefined) {
        world.obstacles[toDrag].setFriend();
        var startX = world.obstacles[toDrag].getCurrentX();
        var startY = world.obstacles[toDrag].getCurrentY();
        var currentX = mouse.x - canvas.width / 2 + player.getX();
        console.log("  " + player.getX());
        var currentY = canvas.height / 2 - mouse.y - Obstacle_1.Obstacle.dimension + player.getY();
        if (firstDrag) {
            deltaX = currentX - startX;
            deltaY = currentY - startY;
            firstDrag = false;
        }
        var offsetX = currentX - Math.abs(deltaX);
        var offsetY = currentY + Math.abs(deltaY);
        if (offsetX >= world.getRightBound())
            return;
        if (offsetX <= world.getLeftBound())
            return;
        if (offsetY <= world.getBottomBound())
            return;
        if (offsetY >= world.getTopBound())
            return;
        world.obstacles[toDrag].setCurrentX(offsetX);
        world.obstacles[toDrag].setCurrentY(offsetY);
    }
};
