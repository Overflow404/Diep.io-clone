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
