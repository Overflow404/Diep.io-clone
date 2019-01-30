import { ActionBehavior } from "./ActionBehavior";
import { Bullet } from "./Bullet";
import { World } from "./World";
import { Obstacle } from "./Obstacle";
export class RocketGun implements ActionBehavior {

    private canvasContext: CanvasRenderingContext2D
    private world: World
    private bullets = new Array<Bullet>()
    private bulletDurationX = 150
    private bulletDurationY = 150
    static canFire = true
    constructor(canvasContext: CanvasRenderingContext2D, world: World) {
        this.canvasContext = canvasContext
        this.world = world
    }

    fire(playerX: number, worldX: number, playerY: number, worldY: number, alpha: number) {
        if (RocketGun.canFire) {
            let bullet = new Bullet(playerX + worldX, playerY + worldY, 15, 15, playerX, playerY, alpha, true, 3)
            this.bullets.push(bullet)
            RocketGun.canFire = false;
            setTimeout(function wait() { RocketGun.canFire = true }, 1000)
        }
    }

    updateBulletsPosition() {
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].setCurrentX(0.7)
            this.bullets[i].setCurrentY(0.7)
            if (Math.abs(this.bullets[i].getCurrentX() - this.bullets[i].getStartX()) > this.bulletDurationX
                || Math.abs(this.bullets[i].getCurrentY() - this.bullets[i].getStartY()) > this.bulletDurationY) {
                this.bullets[i].setBulletFired(false)
                this.bullets.splice(i, 1);
            }
        }
    }

    renderBullets() {
        let obstacles = this.world.obstacles
        for (let i = 0; i < this.bullets.length; i++) {
            let x = this.bullets[i].getAcceleration() * this.bullets[i].getCurrentX() * 
                Math.cos(this.bullets[i].getAlpha()) + this.bullets[i].getPlayerX()
            let y = this.bullets[i].getAcceleration() * this.bullets[i].getCurrentY() * 
                Math.sin(this.bullets[i].getAlpha())  + this.bullets[i].getPlayerY()
                this.bullets[i].incAcceleration()
            this.detectCollision(obstacles, i, x , y)
            if (this.bullets[i].getOpacity() <= 0) {
                this.bullets[i].setBulletFired(false)
                this.bullets.splice(i, 1)
                this.world.incDefeated()
            } else {
                if (this.bullets[i].getToRemove()) {
                    this.bullets[i].decOpacity();
                }
                this.canvasContext.save()
                this.canvasContext.fillStyle = "rgba(255, 165, 0, " + this.bullets[i].getOpacity() + ")";
                this.canvasContext.strokeStyle = "rgba(0, 0, 0, " + this.bullets[i].getOpacity() + ")";
                this.canvasContext.beginPath()
                this.canvasContext.arc(x, y, 20, 0, 2 * Math.PI)
                this.canvasContext.fill();
                this.canvasContext.stroke();
                this.canvasContext.closePath()
                this.canvasContext.restore()
            }
        }

    }
    
    thereAreBulletsFired() {
        for (let i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].isBulletFired()) return true
        }
        return false
    }

    detectCollision(obstacles: Array<Obstacle>, i: number, x: number, y: number) {
        for (var j = 0; j < obstacles.length; j++) {
            if (obstacles[j].isFriend()) continue
            if (obstacles[j].isToRemove()) continue
            let circleR = 20
            let rectW = Obstacle.dimension, rectH = Obstacle.dimension
            let circleDistanceX = Math.abs(x - obstacles[j].getCurrentX());
            let circleDistanceY = Math.abs(y - obstacles[j].getCurrentY());
            
            if (circleDistanceX > (rectW / 2 + circleR)) { continue }
            if (circleDistanceY > (rectH / 2 + circleR)) { continue }

            if (circleDistanceX <= (rectW / 2)) {
                this.bullets[i].setToRemove();
                obstacles[j].setToRemove();
                break
            }
            if (circleDistanceY <= (rectH / 2)) {
                this.bullets[i].setToRemove();
                obstacles[j].setToRemove();
                break
            }

            let cornerDistanceSq = Math.pow(circleDistanceX - rectW / 2,2) +
                Math.pow((circleDistanceY - rectH) / 2,2);
            if (cornerDistanceSq <= (Math.pow(circleR,2))) {
                this.bullets[i].setToRemove();
                obstacles[j].setToRemove();
                break
            }
        }
    }
}