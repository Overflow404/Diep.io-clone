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
