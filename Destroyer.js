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
