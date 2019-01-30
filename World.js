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
