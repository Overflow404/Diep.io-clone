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
