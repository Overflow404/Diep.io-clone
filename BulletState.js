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