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
