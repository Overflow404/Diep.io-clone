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
