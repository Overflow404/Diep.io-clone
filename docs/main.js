(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;

},{}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Bullet = /** @class */ (function () {
    function Bullet(startX, startY, currentX, currentY, playerX, playerY, alpha, bulletFired, acceleration) {
        this.opacity = 1;
        this.startX = startX;
        this.startY = startY;
        //Da dove parte il bullet?
        this.currentX = currentX;
        this.currentY = currentY;
        this.playerX = playerX;
        this.playerY = playerY;
        this.alpha = alpha;
        this.bulletFired = bulletFired;
        this.acceleration = acceleration;
    }
    Bullet.prototype.getStartX = function () { return this.startX; };
    Bullet.prototype.getStartY = function () { return this.startY; };
    Bullet.prototype.getCurrentX = function () { return this.currentX; };
    Bullet.prototype.getCurrentY = function () { return this.currentY; };
    Bullet.prototype.getPlayerX = function () { return this.playerX; };
    Bullet.prototype.getPlayerY = function () { return this.playerY; };
    Bullet.prototype.getAlpha = function () { return this.alpha; };
    Bullet.prototype.getToRemove = function () { return this.toRemove; };
    Bullet.prototype.getOpacity = function () { return this.opacity; };
    Bullet.prototype.getAcceleration = function () { return this.acceleration; };
    Bullet.prototype.incAcceleration = function () { this.acceleration += 0.03; };
    Bullet.prototype.setAcceleration = function (v) { this.acceleration = v; };
    Bullet.prototype.setStartX = function (v) { this.startX = v; };
    Bullet.prototype.setStartY = function (v) { this.startY = v; };
    Bullet.prototype.setCurrentX = function (v) { this.currentX += v; };
    Bullet.prototype.setCurrentY = function (v) { this.currentY += v; };
    Bullet.prototype.setPlayerX = function (v) { this.playerX = v; };
    Bullet.prototype.setPlayerY = function (v) { this.playerY = v; };
    Bullet.prototype.setAlpha = function (v) { this.alpha = v; };
    Bullet.prototype.setBulletFired = function (v) { this.bulletFired = v; };
    Bullet.prototype.setToRemove = function () { this.toRemove = true; };
    Bullet.prototype.decOpacity = function () { this.opacity -= 0.1; };
    Bullet.prototype.isBulletFired = function () { return this.bulletFired; };
    return Bullet;
}());
exports.Bullet = Bullet;

},{}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var BulletState = /** @class */ (function () {
    function BulletState(startX, startY, currentX, currentY, playerX, playerY, alpha, bulletFired) {
        this.opacity = 1;
        this.acceleration = 5;
        this.startX = startX;
        this.startY = startY;
        this.currentX = currentX;
        this.currentY = currentY;
        this.playerX = playerX;
        this.playerY = playerY;
        this.alpha = alpha;
        this.bulletFired = bulletFired;
    }
    BulletState.prototype.getStartX = function () { return this.startX; };
    BulletState.prototype.getStartY = function () { return this.startY; };
    BulletState.prototype.getCurrentX = function () { return this.currentX; };
    BulletState.prototype.getCurrentY = function () { return this.currentY; };
    BulletState.prototype.getPlayerX = function () { return this.playerX; };
    BulletState.prototype.getPlayerY = function () { return this.playerY; };
    BulletState.prototype.getAlpha = function () { return this.alpha; };
    BulletState.prototype.getToRemove = function () { return this.toRemove; };
    BulletState.prototype.getOpacity = function () { return this.opacity; };
    BulletState.prototype.getAcceleration = function () { return this.acceleration; };
    BulletState.prototype.incAcceleration = function () { this.acceleration += 0.03; };
    BulletState.prototype.setAcceleration = function (v) { this.acceleration = v; };
    BulletState.prototype.setStartX = function (v) { this.startX = v; };
    BulletState.prototype.setStartY = function (v) { this.startY = v; };
    BulletState.prototype.setCurrentX = function (v) { this.currentX += v; };
    BulletState.prototype.setCurrentY = function (v) { this.currentY += v; };
    BulletState.prototype.setPlayerX = function (v) { this.playerX = v; };
    BulletState.prototype.setPlayerY = function (v) { this.playerY = v; };
    BulletState.prototype.setAlpha = function (v) { this.alpha = v; };
    BulletState.prototype.setBulletFired = function (v) { this.bulletFired = v; };
    BulletState.prototype.setToRemove = function () { this.toRemove = true; };
    BulletState.prototype.decOpacity = function () { this.opacity -= 0.1; };
    BulletState.prototype.isBulletFired = function () { return this.bulletFired; };
    return BulletState;
}());
exports.BulletState = BulletState;

},{}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Tank_1 = require("./Tank");
var Obstacle_1 = require("./Obstacle");
var Destroyer = /** @class */ (function (_super) {
    __extends(Destroyer, _super);
    function Destroyer(world) {
        var _this = _super.call(this) || this;
        _this.destroyer = {
            radius: 20,
            velocityX: 0,
            velocityY: 0,
            speed: 2,
            friction: 0.97,
            cannonWidth: 35,
            cannonColor: 'grey',
            cannonLength: 2,
            bodyColor: '#FFA500',
            angle: 0,
            movSpeed: 1
        };
        _this.world = world;
        _this.setBound(world.getWidth(), world.getHeight());
        return _this;
    }
    Destroyer.prototype.display = function (canvasContext, offsetX, offsetY) {
        this.lazyInitCanvasContext(canvasContext);
        this.drawTank(offsetX, offsetY);
    };
    Destroyer.prototype.moveDown = function () { if (this.destroyer.velocityY > -this.destroyer.speed)
        this.destroyer.velocityY -= this.destroyer.movSpeed; };
    Destroyer.prototype.moveLeft = function () { if (this.destroyer.velocityX > -this.destroyer.speed)
        this.destroyer.velocityX -= this.destroyer.movSpeed; };
    Destroyer.prototype.moveRight = function () { if (this.destroyer.velocityX < this.destroyer.speed)
        this.destroyer.velocityX += this.destroyer.movSpeed; };
    Destroyer.prototype.moveUp = function () { if (this.destroyer.velocityY < this.destroyer.speed)
        this.destroyer.velocityY += this.destroyer.movSpeed; };
    Destroyer.prototype.getSpeed = function () { return this.destroyer.speed; };
    Destroyer.prototype.getVelocityX = function () { return this.destroyer.velocityX; };
    Destroyer.prototype.getAngle = function () { return this.destroyer.angle; };
    Destroyer.prototype.getVelocityY = function () { return this.destroyer.velocityY; };
    Destroyer.prototype.setVelocityY = function (v) { this.destroyer.velocityY = v; };
    Destroyer.prototype.setVelocityX = function (v) { this.destroyer.velocityX = v; };
    Destroyer.prototype.getFriction = function () { return this.destroyer.friction; };
    Destroyer.prototype.getRadius = function () { return this.destroyer.radius; };
    Destroyer.prototype.setAngle = function (v) { this.destroyer.angle = v; };
    Destroyer.prototype.incMovSpeed = function () { this.destroyer.movSpeed += 0.1; };
    Destroyer.prototype.updateState = function () {
        this.destroyer.velocityY *= this.destroyer.friction;
        this.tank.y += this.destroyer.velocityY;
        this.destroyer.velocityX *= this.destroyer.friction;
        this.tank.x += this.destroyer.velocityX;
        this.detectCollision();
        return this.checkBounds();
    };
    Destroyer.prototype.drawTank = function (offsetX, offsetY) {
        var newOffset = this.calculateOffset(offsetX, offsetY);
        this.drawCannon(newOffset.x, newOffset.y);
        this.drawBody();
    };
    Destroyer.prototype.calculateOffset = function (offsetX, offsetY) {
        this.destroyer.angle = Math.atan2(offsetX, offsetY) - Math.PI / 2;
        var x = this.destroyer.radius * this.destroyer.cannonLength * Math.cos(this.destroyer.angle) + this.tank.x;
        var y = this.destroyer.radius * this.destroyer.cannonLength * Math.sin(this.destroyer.angle) + this.tank.y;
        return { x: x, y: y };
    };
    Destroyer.prototype.drawCannon = function (x, y) {
        this.canvasContext.beginPath();
        this.canvasContext.lineWidth = this.destroyer.cannonWidth;
        this.canvasContext.strokeStyle = this.destroyer.cannonColor;
        this.canvasContext.moveTo(this.tank.x, this.tank.y);
        this.canvasContext.lineTo(x, y);
        this.canvasContext.stroke();
        this.canvasContext.lineWidth = 1;
        this.canvasContext.strokeStyle = 'black';
        this.canvasContext.closePath();
    };
    Destroyer.prototype.drawBody = function () {
        this.canvasContext.beginPath();
        this.canvasContext.fillStyle = this.destroyer.bodyColor;
        this.canvasContext.arc(this.tank.x, this.tank.y, this.destroyer.radius, 0, 2 * Math.PI);
        this.canvasContext.fill();
        this.canvasContext.stroke();
        this.canvasContext.closePath();
    };
    Destroyer.prototype.lazyInitCanvasContext = function (canvasContext) {
        if (this.canvasContext == undefined) {
            this.canvasContext = canvasContext;
        }
    };
    Destroyer.prototype.detectCollision = function () {
        //Body collision
        var obstacles = this.world.obstacles;
        for (var j = 0; j < obstacles.length; j++) {
            if (obstacles[j].isFriend())
                continue;
            var circleR = this.destroyer.radius;
            var rectW = Obstacle_1.Obstacle.dimension, rectH = Obstacle_1.Obstacle.dimension;
            var circleDistanceX = Math.abs(this.tank.x - obstacles[j].getCurrentX());
            var circleDistanceY = Math.abs(this.tank.y - obstacles[j].getCurrentY());
            if (circleDistanceX > (rectW / 2 + circleR)) {
                continue;
            }
            if (circleDistanceY > (rectH / 2 + circleR)) {
                continue;
            }
            if (circleDistanceX <= (rectW / 2)) {
                obstacles[j].setToRemove();
                break;
            }
            if (circleDistanceY <= (rectH / 2)) {
                obstacles[j].setToRemove();
                break;
            }
            var cornerDistance_sq = (circleDistanceX - rectW / 2) ^ 2 +
                (circleDistanceY - rectH / 2) ^ 2;
            if (cornerDistance_sq <= (circleR ^ 2)) {
                obstacles[j].setToRemove();
                break;
            }
        }
    };
    return Destroyer;
}(Tank_1.Tank));
exports.Destroyer = Destroyer;

},{"./Obstacle":6,"./Tank":9}],5:[function(require,module,exports){
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

},{"./Obstacle":6,"./Twin":10,"./TwinGun":11,"./World":12}],6:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Obstacle = /** @class */ (function () {
    function Obstacle(x, y) {
        this.position = {
            x: undefined,
            y: undefined
        };
        this.state = {
            toRemove: undefined,
            opacity: 1,
            friend: false
        };
        this.position.x = x;
        this.position.y = y;
    }
    Obstacle.prototype.getCurrentX = function () { return this.position.x; };
    Obstacle.prototype.getCurrentY = function () { return this.position.y; };
    Obstacle.prototype.getOpacity = function () { return this.state.opacity; };
    Obstacle.prototype.setCurrentX = function (v) { this.position.x = v; };
    Obstacle.prototype.setCurrentY = function (v) { this.position.y = v; };
    Obstacle.prototype.setToRemove = function () { this.state.toRemove = true; };
    Obstacle.prototype.setFriend = function () { this.state.friend = true; };
    Obstacle.prototype.decOpacity = function () { this.state.opacity -= 0.1; };
    Obstacle.prototype.isToRemove = function () { return this.state.toRemove; };
    Obstacle.prototype.isFriend = function () { return this.state.friend; };
    Obstacle.dimension = 30;
    return Obstacle;
}());
exports.Obstacle = Obstacle;

},{}],7:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Bullet_1 = require("./Bullet");
var Obstacle_1 = require("./Obstacle");
var RocketGun = /** @class */ (function () {
    function RocketGun(canvasContext, world) {
        this.bullets = new Array();
        this.bulletDurationX = 150;
        this.bulletDurationY = 150;
        this.canvasContext = canvasContext;
        this.world = world;
    }
    RocketGun.prototype.fire = function (playerX, worldX, playerY, worldY, alpha) {
        if (RocketGun.canFire) {
            var bullet = new Bullet_1.Bullet(playerX + worldX, playerY + worldY, 15, 15, playerX, playerY, alpha, true, 3);
            this.bullets.push(bullet);
            RocketGun.canFire = false;
            setTimeout(function wait() { RocketGun.canFire = true; }, 1000);
        }
    };
    RocketGun.prototype.updateBulletsPosition = function () {
        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].setCurrentX(0.7);
            this.bullets[i].setCurrentY(0.7);
            if (Math.abs(this.bullets[i].getCurrentX() - this.bullets[i].getStartX()) > this.bulletDurationX
                || Math.abs(this.bullets[i].getCurrentY() - this.bullets[i].getStartY()) > this.bulletDurationY) {
                this.bullets[i].setBulletFired(false);
                this.bullets.splice(i, 1);
            }
        }
    };
    RocketGun.prototype.renderBullets = function () {
        var obstacles = this.world.obstacles;
        for (var i = 0; i < this.bullets.length; i++) {
            var x = this.bullets[i].getAcceleration() * this.bullets[i].getCurrentX() *
                Math.cos(this.bullets[i].getAlpha()) + this.bullets[i].getPlayerX();
            var y = this.bullets[i].getAcceleration() * this.bullets[i].getCurrentY() *
                Math.sin(this.bullets[i].getAlpha()) + this.bullets[i].getPlayerY();
            this.bullets[i].incAcceleration();
            this.detectCollision(obstacles, i, x, y);
            if (this.bullets[i].getOpacity() <= 0) {
                this.bullets[i].setBulletFired(false);
                this.bullets.splice(i, 1);
                this.world.incDefeated();
            }
            else {
                if (this.bullets[i].getToRemove()) {
                    this.bullets[i].decOpacity();
                }
                this.canvasContext.save();
                this.canvasContext.fillStyle = "rgba(255, 165, 0, " + this.bullets[i].getOpacity() + ")";
                this.canvasContext.strokeStyle = "rgba(0, 0, 0, " + this.bullets[i].getOpacity() + ")";
                this.canvasContext.beginPath();
                this.canvasContext.arc(x, y, 20, 0, 2 * Math.PI);
                this.canvasContext.fill();
                this.canvasContext.stroke();
                this.canvasContext.closePath();
                this.canvasContext.restore();
            }
        }
    };
    RocketGun.prototype.thereAreBulletsFired = function () {
        for (var i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].isBulletFired())
                return true;
        }
        return false;
    };
    RocketGun.prototype.detectCollision = function (obstacles, i, x, y) {
        for (var j = 0; j < obstacles.length; j++) {
            if (obstacles[j].isFriend())
                continue;
            if (obstacles[j].isToRemove())
                continue;
            var circleR = 20;
            var rectW = Obstacle_1.Obstacle.dimension, rectH = Obstacle_1.Obstacle.dimension;
            var circleDistanceX = Math.abs(x - obstacles[j].getCurrentX());
            var circleDistanceY = Math.abs(y - obstacles[j].getCurrentY());
            if (circleDistanceX > (rectW / 2 + circleR)) {
                continue;
            }
            if (circleDistanceY > (rectH / 2 + circleR)) {
                continue;
            }
            if (circleDistanceX <= (rectW / 2)) {
                this.bullets[i].setToRemove();
                obstacles[j].setToRemove();
                break;
            }
            if (circleDistanceY <= (rectH / 2)) {
                this.bullets[i].setToRemove();
                obstacles[j].setToRemove();
                break;
            }
            var cornerDistanceSq = Math.pow(circleDistanceX - rectW / 2, 2) +
                Math.pow((circleDistanceY - rectH) / 2, 2);
            if (cornerDistanceSq <= (Math.pow(circleR, 2))) {
                this.bullets[i].setToRemove();
                obstacles[j].setToRemove();
                break;
            }
        }
    };
    RocketGun.canFire = true;
    return RocketGun;
}());
exports.RocketGun = RocketGun;

},{"./Bullet":2,"./Obstacle":6}],8:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Bullet_1 = require("./Bullet");
var Obstacle_1 = require("./Obstacle");
var StreamLiner = /** @class */ (function () {
    function StreamLiner(canvasContext, world) {
        this.bullets = new Array();
        this.bulletDurationX = 150;
        this.bulletDurationY = 150;
        this.canvasContext = canvasContext;
        this.world = world;
    }
    StreamLiner.prototype.fire = function (playerX, worldX, playerY, worldY, alpha) {
        if (StreamLiner.canFire) {
            var bullet = new Bullet_1.Bullet(playerX + worldX, playerY + worldY, 15, 15, playerX, playerY, alpha, true, 8);
            this.bullets.push(bullet);
            StreamLiner.canFire = false;
            setTimeout(function wait() { StreamLiner.canFire = true; }, 100);
        }
    };
    StreamLiner.prototype.updateBulletsPosition = function () {
        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].setCurrentX(0.7);
            this.bullets[i].setCurrentY(0.7);
            if (Math.abs(this.bullets[i].getCurrentX() - this.bullets[i].getStartX()) > this.bulletDurationX
                || Math.abs(this.bullets[i].getCurrentY() - this.bullets[i].getStartY()) > this.bulletDurationY) {
                this.bullets[i].setBulletFired(false);
                this.bullets.splice(i, 1);
            }
        }
    };
    StreamLiner.prototype.renderBullets = function () {
        var obstacles = this.world.obstacles;
        for (var i = 0; i < this.bullets.length; i++) {
            var x = this.bullets[i].getAcceleration() * this.bullets[i].getCurrentX() *
                Math.cos(this.bullets[i].getAlpha()) + this.bullets[i].getPlayerX();
            var y = this.bullets[i].getAcceleration() * this.bullets[i].getCurrentY() *
                Math.sin(this.bullets[i].getAlpha()) + this.bullets[i].getPlayerY();
            this.bullets[i].incAcceleration();
            this.detectCollision(obstacles, i, x, y);
            if (this.bullets[i].getOpacity() <= 0) {
                this.bullets[i].setBulletFired(false);
                this.bullets.splice(i, 1);
                this.world.incDefeated();
            }
            else {
                if (this.bullets[i].getToRemove()) {
                    this.bullets[i].decOpacity();
                }
                this.canvasContext.save();
                this.canvasContext.fillStyle = "rgba(255, 165, 0, " + this.bullets[i].getOpacity() + ")";
                this.canvasContext.strokeStyle = "rgba(0, 0, 0, " + this.bullets[i].getOpacity() + ")";
                this.canvasContext.beginPath();
                this.canvasContext.arc(x, y, 5, 0, 2 * Math.PI);
                this.canvasContext.fill();
                this.canvasContext.stroke();
                this.canvasContext.closePath();
                this.canvasContext.restore();
            }
        }
    };
    StreamLiner.prototype.thereAreBulletsFired = function () {
        for (var i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].isBulletFired())
                return true;
        }
        return false;
    };
    StreamLiner.prototype.detectCollision = function (obstacles, i, x, y) {
        for (var j = 0; j < obstacles.length; j++) {
            if (obstacles[j].isFriend())
                continue;
            if (obstacles[j].isToRemove())
                continue;
            var circleR = 5;
            var rectW = Obstacle_1.Obstacle.dimension, rectH = Obstacle_1.Obstacle.dimension;
            var circleDistanceX = Math.abs(x - obstacles[j].getCurrentX());
            var circleDistanceY = Math.abs(y - obstacles[j].getCurrentY());
            if (circleDistanceX > (rectW / 2 + circleR)) {
                continue;
            }
            if (circleDistanceY > (rectH / 2 + circleR)) {
                continue;
            }
            if (circleDistanceX <= (rectW / 2)) {
                this.bullets[i].setToRemove();
                obstacles[j].setToRemove();
                break;
            }
            if (circleDistanceY <= (rectH / 2)) {
                this.bullets[i].setToRemove();
                obstacles[j].setToRemove();
                break;
            }
            var cornerDistanceSq = (circleDistanceX - rectW / 2) ^ 2 +
                (circleDistanceY - rectH / 2) ^ 2;
            if (cornerDistanceSq <= (circleR ^ 2)) {
                this.bullets[i].setToRemove();
                obstacles[j].setToRemove();
                break;
            }
        }
    };
    StreamLiner.canFire = true;
    return StreamLiner;
}());
exports.StreamLiner = StreamLiner;

},{"./Bullet":2,"./Obstacle":6}],9:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Tank = /** @class */ (function () {
    function Tank() {
        this.bound = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };
        this.tank = {
            x: 0,
            y: 0
        };
        this.allowedMovement = {
            all: 0,
            leftOrRight: 1,
            upOrDown: 2,
            none: 3
        };
    }
    Tank.prototype.setBound = function (worldWidth, worldHeight) {
        this.bound.top = worldHeight / 2;
        this.bound.bottom = -worldHeight / 2;
        this.bound.right = worldWidth / 2;
        this.bound.left = -worldWidth / 2;
    };
    Tank.prototype.getX = function () { return this.tank.x; };
    Tank.prototype.getY = function () { return this.tank.y; };
    Tank.prototype.setX = function (v) { this.tank.x = v; };
    Tank.prototype.setY = function (v) { this.tank.y = v; };
    Tank.prototype.isOutOfTopBound = function () { return this.tank.y >= this.bound.top; };
    Tank.prototype.isOutOfBottomBound = function () { return this.tank.y < this.bound.bottom; };
    Tank.prototype.isOutOfRightBound = function () { return this.tank.x > this.bound.right; };
    Tank.prototype.isOutOfLeftBound = function () { return this.tank.x < this.bound.left; };
    Tank.prototype.checkBounds = function () {
        if (this.isOutOfTopBound()) {
            this.tank.y = this.bound.top;
            if (this.isOutOfRightBound()) {
                this.tank.x = this.bound.right;
                return this.allowedMovement.none;
            }
            else if (this.isOutOfLeftBound()) {
                this.tank.x = this.bound.left;
                return this.allowedMovement.none;
            }
            return this.allowedMovement.leftOrRight;
        }
        else if (this.isOutOfBottomBound()) {
            this.tank.y = this.bound.bottom;
            if (this.isOutOfRightBound()) {
                this.tank.x = this.bound.right;
                return this.allowedMovement.none;
            }
            else if (this.isOutOfLeftBound()) {
                this.tank.x = this.bound.left;
                return this.allowedMovement.none;
            }
            return this.allowedMovement.leftOrRight;
        }
        if (this.isOutOfRightBound()) {
            this.tank.x = this.bound.right;
            return this.allowedMovement.upOrDown;
        }
        else if (this.isOutOfLeftBound()) {
            this.tank.x = this.bound.left;
            return this.allowedMovement.upOrDown;
        }
        return this.allowedMovement.all;
    };
    return Tank;
}());
exports.Tank = Tank;

},{}],10:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Tank_1 = require("./Tank");
var Obstacle_1 = require("./Obstacle");
var Twin = /** @class */ (function (_super) {
    __extends(Twin, _super);
    function Twin(world) {
        var _this = _super.call(this) || this;
        _this.twin = {
            radius: 20,
            velocityX: 0,
            velocityY: 0,
            speed: 2,
            friction: 0.97,
            cannonWidth: 35,
            cannonColor: 'grey',
            cannonLength: 2,
            bodyColor: '#FFA500',
            angle: 0,
            movSpeed: 1
        };
        _this.world = world;
        _this.setBound(world.getWidth(), world.getHeight());
        return _this;
    }
    Twin.prototype.display = function (canvasContext, offsetX, offsetY) {
        this.lazyInitCanvasContext(canvasContext);
        this.drawTank(offsetX, offsetY);
    };
    Twin.prototype.moveDown = function () { if (this.twin.velocityY > -this.twin.speed)
        this.twin.velocityY -= this.twin.movSpeed; };
    Twin.prototype.moveLeft = function () { if (this.twin.velocityX > -this.twin.speed)
        this.twin.velocityX -= this.twin.movSpeed; };
    Twin.prototype.moveRight = function () { if (this.twin.velocityX < this.twin.speed)
        this.twin.velocityX += this.twin.movSpeed; };
    Twin.prototype.moveUp = function () { if (this.twin.velocityY < this.twin.speed)
        this.twin.velocityY += this.twin.movSpeed; };
    Twin.prototype.getSpeed = function () { return this.twin.speed; };
    Twin.prototype.getVelocityX = function () { return this.twin.velocityX; };
    Twin.prototype.setVelocityX = function (v) { this.twin.velocityX = v; };
    Twin.prototype.setAngle = function (v) { this.twin.angle = v; };
    Twin.prototype.getAngle = function () { return this.twin.angle; };
    Twin.prototype.getVelocityY = function () { return this.twin.velocityY; };
    Twin.prototype.setVelocityY = function (v) { this.twin.velocityY = v; };
    Twin.prototype.getFriction = function () { return this.twin.friction; };
    Twin.prototype.getRadius = function () { return this.twin.radius; };
    Twin.prototype.incMovSpeed = function () { this.twin.movSpeed += 0.1; };
    Twin.prototype.setMovSpeed = function (v) { this.twin.movSpeed = v; };
    Twin.prototype.getMovSpeed = function () { return this.twin.movSpeed; };
    Twin.prototype.updateState = function () {
        this.twin.velocityY *= this.twin.friction;
        this.tank.y += this.twin.velocityY;
        this.twin.velocityX *= this.twin.friction;
        this.tank.x += this.twin.velocityX;
        this.detectCollision();
        return this.checkBounds();
    };
    Twin.prototype.drawTank = function (offsetX, offsetY) {
        var newOffset = this.calculateOffset(offsetX, offsetY, 1);
        this.drawCannon(newOffset.x, newOffset.y, 1);
        newOffset = this.calculateOffset(offsetX, offsetY, -1);
        this.drawCannon(newOffset.x, newOffset.y, -1);
        this.drawBody();
    };
    Twin.prototype.calculateOffset = function (offsetX, offsetY, direction) {
        this.twin.angle = Math.atan2(offsetX, offsetY) - Math.PI / 2;
        var x = this.twin.radius * this.twin.cannonLength * Math.cos(this.twin.angle) + (this.tank.x * direction);
        var y = this.twin.radius * this.twin.cannonLength * Math.sin(this.twin.angle) + (this.tank.y * direction);
        return { x: x, y: y };
    };
    Twin.prototype.drawCannon = function (x, y, direction) {
        this.canvasContext.beginPath();
        this.canvasContext.lineWidth = this.twin.cannonWidth;
        this.canvasContext.strokeStyle = this.twin.cannonColor;
        this.canvasContext.moveTo(this.tank.x, this.tank.y);
        this.canvasContext.lineTo(x * direction, y * direction);
        this.canvasContext.stroke();
        this.canvasContext.lineWidth = 1;
        this.canvasContext.strokeStyle = 'black';
        this.canvasContext.closePath();
    };
    Twin.prototype.drawBody = function () {
        this.canvasContext.beginPath();
        this.canvasContext.fillStyle = this.twin.bodyColor;
        this.canvasContext.arc(this.tank.x, this.tank.y, this.twin.radius, 0, 2 * Math.PI);
        this.canvasContext.fill();
        this.canvasContext.stroke();
        this.canvasContext.closePath();
    };
    Twin.prototype.lazyInitCanvasContext = function (canvasContext) {
        if (this.canvasContext == undefined) {
            this.canvasContext = canvasContext;
        }
    };
    Twin.prototype.detectCollision = function () {
        //Body collision
        var obstacles = this.world.obstacles;
        for (var j = 0; j < obstacles.length; j++) {
            if (obstacles[j].isFriend())
                continue;
            var circleR = this.twin.radius;
            var rectW = Obstacle_1.Obstacle.dimension, rectH = Obstacle_1.Obstacle.dimension;
            var circleDistanceX = Math.abs(this.tank.x - obstacles[j].getCurrentX());
            var circleDistanceY = Math.abs(this.tank.y - obstacles[j].getCurrentY());
            if (circleDistanceX > (rectW / 2 + circleR)) {
                continue;
            }
            if (circleDistanceY > (rectH / 2 + circleR)) {
                continue;
            }
            if (circleDistanceX <= (rectW / 2)) {
                obstacles[j].setToRemove();
                break;
            }
            if (circleDistanceY <= (rectH / 2)) {
                obstacles[j].setToRemove();
                break;
            }
            var cornerDistance_sq = (circleDistanceX - rectW / 2) ^ 2 +
                (circleDistanceY - rectH / 2) ^ 2;
            if (cornerDistance_sq <= (circleR ^ 2)) {
                obstacles[j].setToRemove();
                break;
            }
        }
    };
    return Twin;
}(Tank_1.Tank));
exports.Twin = Twin;

},{"./Obstacle":6,"./Tank":9}],11:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Bullet_1 = require("./Bullet");
var Obstacle_1 = require("./Obstacle");
var TwinGun = /** @class */ (function () {
    function TwinGun(canvasContext, world) {
        this.bullets = new Array();
        this.bulletDurationX = 60;
        this.bulletDurationY = 60;
        this.canvasContext = canvasContext;
        this.world = world;
    }
    TwinGun.prototype.fire = function (playerX, worldX, playerY, worldY, alpha) {
        if (TwinGun.canFire) {
            var bullet1 = new Bullet_1.Bullet(playerX + worldX, playerY + worldY, 15, 15, playerX, playerY, alpha, true, 5);
            var bullet2 = new Bullet_1.Bullet(playerX + worldX, playerY + worldY, 15, 15, playerX, playerY, (alpha - Math.PI), true, 5);
            this.bullets.push(bullet1);
            this.bullets.push(bullet2);
            TwinGun.canFire = false;
            setTimeout(function wait() { TwinGun.canFire = true; }, 700);
        }
    };
    TwinGun.prototype.updateBulletsPosition = function () {
        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].setCurrentX(0.7);
            this.bullets[i].setCurrentY(0.7);
            if (Math.abs(this.bullets[i].getCurrentX() - this.bullets[i].getStartX()) > this.bulletDurationX
                || Math.abs(this.bullets[i].getCurrentY() - this.bullets[i].getStartY()) > this.bulletDurationY) {
                this.bullets[i].setBulletFired(false);
                this.bullets.splice(i, 1);
            }
        }
    };
    TwinGun.prototype.renderBullets = function () {
        var obstacles = this.world.obstacles;
        for (var i = 0; i < this.bullets.length; i++) {
            var x = this.bullets[i].getAcceleration() * this.bullets[i].getCurrentX() *
                Math.cos(this.bullets[i].getAlpha()) + this.bullets[i].getPlayerX();
            var y = this.bullets[i].getAcceleration() * this.bullets[i].getCurrentY() *
                Math.sin(this.bullets[i].getAlpha()) + this.bullets[i].getPlayerY();
            this.bullets[i].incAcceleration();
            this.detectCollision(obstacles, i, x, y);
            if (this.bullets[i].getOpacity() <= 0) {
                this.bullets[i].setBulletFired(false);
                this.bullets.splice(i, 1);
                this.world.incDefeated();
            }
            else {
                if (this.bullets[i].getToRemove()) {
                    this.bullets[i].decOpacity();
                }
                this.canvasContext.save();
                this.canvasContext.fillStyle = "rgba(255, 165, 0, " + this.bullets[i].getOpacity() + ")";
                this.canvasContext.strokeStyle = "rgba(0, 0, 0, " + this.bullets[i].getOpacity() + ")";
                this.canvasContext.beginPath();
                this.canvasContext.arc(x, y, 15, 0, 2 * Math.PI);
                this.canvasContext.fill();
                this.canvasContext.stroke();
                this.canvasContext.closePath();
                this.canvasContext.restore();
            }
        }
    };
    TwinGun.prototype.thereAreBulletsFired = function () {
        for (var i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].isBulletFired())
                return true;
        }
        return false;
    };
    TwinGun.prototype.detectCollision = function (obstacles, i, x, y) {
        for (var j = 0; j < obstacles.length; j++) {
            if (obstacles[j].isFriend())
                continue;
            if (obstacles[j].isToRemove())
                continue;
            var circleR = 15;
            var rectW = Obstacle_1.Obstacle.dimension, rectH = Obstacle_1.Obstacle.dimension;
            var circleDistanceX = Math.abs(x - obstacles[j].getCurrentX());
            var circleDistanceY = Math.abs(y - obstacles[j].getCurrentY());
            if (circleDistanceX > (rectW / 2 + circleR)) {
                continue;
            }
            if (circleDistanceY > (rectH / 2 + circleR)) {
                continue;
            }
            if (circleDistanceX <= (rectW / 2)) {
                this.bullets[i].setToRemove();
                obstacles[j].setToRemove();
                break;
            }
            if (circleDistanceY <= (rectH / 2)) {
                this.bullets[i].setToRemove();
                obstacles[j].setToRemove();
                break;
            }
            var cornerDistanceSq = Math.pow(circleDistanceX - rectW / 2, 2) +
                Math.pow((circleDistanceY - rectH) / 2, 2);
            if (cornerDistanceSq <= (Math.pow(circleR, 2))) {
                this.bullets[i].setToRemove();
                obstacles[j].setToRemove();
                break;
            }
        }
    };
    TwinGun.canFire = true;
    return TwinGun;
}());
exports.TwinGun = TwinGun;

},{"./Bullet":2,"./Obstacle":6}],12:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Obstacle_1 = require("./Obstacle");
var World = /** @class */ (function () {
    function World(canvasContext) {
        this.world = {
            x: 0,
            y: 0,
            velocityX: 0,
            velocityY: 0,
            speed: 0,
            friction: 0,
            width: 1000,
            height: 1000,
            movSpeed: 1
        };
        this.defeated = 0;
        this.initObstacles = true;
        this.bound = {
            rightBound: undefined,
            leftBound: undefined,
            topBound: undefined,
            bottomBound: undefined
        };
        this.obstacles = new Array();
        this.nObstacles = 15;
        this.canvasContext = canvasContext;
    }
    World.prototype.add = function (player) {
        this.tank = player;
        this.world.speed = this.tank.getSpeed();
        this.world.friction = this.tank.getFriction();
        this.world.velocityX = this.tank.getVelocityX();
        this.world.velocityY = this.tank.getVelocityY();
    };
    World.prototype.updateState = function () {
        this.world.velocityY *= this.world.friction;
        this.world.y += this.world.velocityY;
        this.world.velocityX *= this.world.friction;
        this.world.x += this.world.velocityX;
        if (this.world.y < -this.world.height / 2)
            this.world.y = -this.world.height / 2;
        else if (this.world.y > this.world.height / 2)
            this.world.y = this.world.height / 2;
        if (this.world.x < -this.world.width / 2)
            this.world.x = -this.world.width / 2;
        else if (this.world.x > this.world.width / 2)
            this.world.x = this.world.width / 2;
    };
    World.prototype.moveRight = function () { if (this.world.velocityX < this.world.speed)
        this.world.velocityX += this.world.movSpeed; };
    World.prototype.moveUp = function () { if (this.world.velocityY < this.world.speed)
        this.world.velocityY += this.world.movSpeed; };
    World.prototype.moveDown = function () { if (this.world.velocityY > -this.world.speed)
        this.world.velocityY -= this.world.movSpeed; };
    World.prototype.moveLeft = function () { if (this.world.velocityX > -this.world.speed)
        this.world.velocityX -= this.world.movSpeed; };
    World.prototype.getWidth = function () { return this.world.width; };
    World.prototype.getHeight = function () { return this.world.height; };
    World.prototype.getFriction = function () { return this.world.friction; };
    World.prototype.getVelocityX = function () { return this.world.velocityX; };
    World.prototype.setVelocityX = function () { this.world.velocityX *= this.world.friction; };
    World.prototype.getVelocityY = function () { return this.world.velocityY; };
    World.prototype.setVelocityY = function () { this.world.velocityY *= this.world.friction; };
    World.prototype.getX = function () { return this.world.x; };
    World.prototype.getY = function () { return this.world.y; };
    World.prototype.setX = function () { this.world.x += this.world.velocityY; };
    World.prototype.setY = function () { this.world.x += this.world.velocityX; };
    World.prototype.getSpeed = function () { return this.world.speed; };
    World.prototype.getRightBound = function () { return this.bound.rightBound; };
    World.prototype.getLeftBound = function () { return this.bound.leftBound; };
    World.prototype.getBottomBound = function () { return this.bound.bottomBound; };
    World.prototype.getTopBound = function () { return this.bound.topBound; };
    World.prototype.getDefeated = function () { return this.defeated; };
    World.prototype.getObstacles = function () { return this.obstacles; };
    World.prototype.incMoveSpeed = function () { this.world.movSpeed += 0.1; };
    World.prototype.incDefeated = function () {
        this.defeated++;
        //this.tank.incMovSpeed()
        //this.incMoveSpeed()
    };
    World.prototype.drawBoundary = function () {
        var rectX = Math.round(-this.world.width / 2 - this.tank.getRadius());
        var rectY = Math.round(-this.world.height / 2 - this.tank.getRadius());
        var rectWidth = Math.round(this.world.width + 2 * this.tank.getRadius());
        var rectHeight = Math.round(this.world.height + 2 * this.tank.getRadius());
        this.bound.rightBound = rectX + rectWidth - Obstacle_1.Obstacle.dimension;
        this.bound.leftBound = rectX;
        this.bound.topBound = rectY + rectHeight - Obstacle_1.Obstacle.dimension;
        this.bound.bottomBound = rectY;
        this.canvasContext.beginPath();
        this.canvasContext.rect(rectX, rectY, rectWidth, rectHeight);
        this.canvasContext.stroke();
        this.canvasContext.closePath();
        if (this.initObstacles) {
            for (var i = 0; i < this.nObstacles; i++) {
                this.obstacles[i] = new Obstacle_1.Obstacle(this.random(rectX, rectX + rectWidth - Obstacle_1.Obstacle.dimension), this.random(rectY, rectY + rectHeight - Obstacle_1.Obstacle.dimension));
            }
            this.initObstacles = false;
        }
    };
    World.prototype.drawObstacles = function () {
        for (var i = 0; i < this.nObstacles; i++) {
            if (this.obstacles[i].getOpacity() === 0) {
                this.nObstacles--;
                //Dovrei rimuoverlo, ma se lo rimuovo mi causa flickering sul draw degli altri ostacoli
                //this.obstacles.splice(i, 1)
                this.incDefeated();
            }
            else if (this.obstacles[i].getOpacity() < 0) {
                //Deriva dalla non rimozione dell'ostacolo, se è stato distrutto non lo disegno
                continue;
            }
            else {
                if (this.obstacles[i].isToRemove()) {
                    this.obstacles[i].decOpacity();
                }
                this.canvasContext.save();
                this.canvasContext.beginPath();
                if (this.obstacles[i].isFriend()) {
                    this.canvasContext.fillStyle = "rgba(255, 165, 0, " + this.obstacles[i].getOpacity() + ")";
                }
                else {
                    this.canvasContext.fillStyle = "rgba(203, 0, 0, " + this.obstacles[i].getOpacity() + ")";
                }
                this.canvasContext.strokeStyle = "rgba(128, 0, 0, " + this.obstacles[i].getOpacity() + ")";
                this.canvasContext.rect(this.obstacles[i].getCurrentX(), this.obstacles[i].getCurrentY(), Obstacle_1.Obstacle.dimension, Obstacle_1.Obstacle.dimension);
                this.canvasContext.fill();
                this.canvasContext.stroke();
                this.canvasContext.closePath();
                this.canvasContext.restore();
            }
        }
    };
    World.prototype.random = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    World.prototype.obstacleInMouse = function (mouseX, mouseY, x, y) {
        var offsetX = Math.ceil(mouseX - x + this.tank.getX());
        var offsetY = y - mouseY - Obstacle_1.Obstacle.dimension + this.tank.getY();
        console.log(offsetX + " " + offsetY);
        for (var i = this.nObstacles - 1; i >= 0; i--) {
            var o = this.obstacles[i];
            if (offsetX >= o.getCurrentX() && offsetX <= o.getCurrentX() + Obstacle_1.Obstacle.dimension
                && offsetY <= o.getCurrentY() && offsetY >= o.getCurrentY() - Obstacle_1.Obstacle.dimension)
                return i;
        }
        return -1;
    };
    return World;
}());
exports.World = World;

},{"./Obstacle":6}]},{},[1,4,5,7,9,12,3,8,10,11]);
