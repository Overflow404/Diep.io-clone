import { Tank } from "./Tank";
import { Obstacle } from "./Obstacle";

export class World {

    private world = {
        x: 0,
        y: 0,
        velocityX: 0,
        velocityY: 0,
        speed: 0,
        friction: 0,
        width: 1000,
        height: 1000,
        movSpeed: 1
    }

    private canvasContext: CanvasRenderingContext2D
    private tank: Tank
    private defeated = 0
    private initObstacles = true

    private bound = {
        rightBound: undefined,
        leftBound: undefined,
        topBound: undefined,
        bottomBound: undefined
    }

    obstacles: Array<Obstacle> = new Array()
    nObstacles = 15

    constructor(canvasContext: CanvasRenderingContext2D) {
        this.canvasContext = canvasContext
    }

    add(player: Tank) {
        this.tank = player
        this.world.speed = this.tank.getSpeed()
        this.world.friction = this.tank.getFriction()
        this.world.velocityX = this.tank.getVelocityX()
        this.world.velocityY = this.tank.getVelocityY()
    }

    updateState() {
        this.world.velocityY *= this.world.friction;
        this.world.y += this.world.velocityY;
        this.world.velocityX *= this.world.friction;
        this.world.x += this.world.velocityX;

        if (this.world.y < -this.world.height / 2) this.world.y = -this.world.height / 2
        else if (this.world.y > this.world.height / 2) this.world.y = this.world.height / 2
        if (this.world.x < -this.world.width / 2) this.world.x = -this.world.width / 2
        else if (this.world.x > this.world.width / 2) this.world.x = this.world.width / 2
    }

    moveRight() { if (this.world.velocityX < this.world.speed) this.world.velocityX += this.world.movSpeed }
    moveUp() { if (this.world.velocityY < this.world.speed) this.world.velocityY += this.world.movSpeed }
    moveDown() { if (this.world.velocityY > -this.world.speed) this.world.velocityY -= this.world.movSpeed }
    moveLeft() { if (this.world.velocityX > -this.world.speed) this.world.velocityX -= this.world.movSpeed }
    getWidth() { return this.world.width }
    getHeight() { return this.world.height }
    getFriction() { return this.world.friction }
    getVelocityX() { return this.world.velocityX }
    setVelocityX() { this.world.velocityX *= this.world.friction }
    getVelocityY() { return this.world.velocityY }
    setVelocityY() { this.world.velocityY *= this.world.friction }
    getX() { return this.world.x }
    getY() { return this.world.y }
    setX() { this.world.x += this.world.velocityY }
    setY() { this.world.x += this.world.velocityX }
    getSpeed() { return this.world.speed }
    getRightBound() { return this.bound.rightBound }
    getLeftBound() { return this.bound.leftBound }
    getBottomBound() { return this.bound.bottomBound }
    getTopBound() { return this.bound.topBound }
    getDefeated() { return this.defeated }
    getObstacles() { return this.obstacles; }
    incMoveSpeed() { this.world.movSpeed += 0.1 }

    incDefeated() {
        this.defeated++
        //this.tank.incMovSpeed()
        //this.incMoveSpeed()
    }

    drawBoundary() {
        let rectX = Math.round(-this.world.width / 2 - this.tank.getRadius())
        let rectY =  Math.round(-this.world.height / 2 - this.tank.getRadius())
        let rectWidth =  Math.round(this.world.width + 2 * this.tank.getRadius())
        let rectHeight =  Math.round(this.world.height + 2 * this.tank.getRadius())
        this.bound.rightBound = rectX + rectWidth - Obstacle.dimension
        this.bound.leftBound = rectX
        this.bound.topBound = rectY + rectHeight - Obstacle.dimension
        this.bound.bottomBound = rectY
        this.canvasContext.beginPath()
        this.canvasContext.rect(rectX, rectY, rectWidth, rectHeight)
        this.canvasContext.stroke()
        this.canvasContext.closePath();
        if (this.initObstacles) {
            for (let i = 0; i < this.nObstacles; i++) {
                this.obstacles[i] = new Obstacle(this.random(rectX, rectX + rectWidth - Obstacle.dimension),
                    this.random(rectY, rectY + rectHeight - Obstacle.dimension))
            }
            this.initObstacles = false;
        }
    }

    drawObstacles() {
        for (let i = 0; i < this.nObstacles; i++) {
            if (this.obstacles[i].getOpacity() === 0) {
                this.nObstacles--;
                //Dovrei rimuoverlo, ma se lo rimuovo mi causa flickering sul draw degli altri ostacoli
                //this.obstacles.splice(i, 1)
                this.incDefeated()
            } else if (this.obstacles[i].getOpacity() < 0) {
                //Deriva dalla non rimozione dell'ostacolo, se è stato distrutto non lo disegno
                continue
            }
            else {
                if (this.obstacles[i].isToRemove()) {
                    this.obstacles[i].decOpacity();
                }
                this.canvasContext.save()
                this.canvasContext.beginPath();
                if (this.obstacles[i].isFriend()) {
                    this.canvasContext.fillStyle = "rgba(255, 165, 0, " + this.obstacles[i].getOpacity() + ")";
                } else {
                    this.canvasContext.fillStyle = "rgba(203, 0, 0, " + this.obstacles[i].getOpacity() + ")";
                }

                this.canvasContext.strokeStyle = "rgba(128, 0, 0, " + this.obstacles[i].getOpacity() + ")";
                this.canvasContext.rect(this.obstacles[i].getCurrentX(), this.obstacles[i].getCurrentY(),
                    Obstacle.dimension, Obstacle.dimension);
                this.canvasContext.fill()
                this.canvasContext.stroke()
                this.canvasContext.closePath();
                this.canvasContext.restore()
            }
        }

    }

    random(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    obstacleInMouse(mouseX: number, mouseY: number, x, y): number {
        let offsetX = Math.ceil(mouseX - x + this.tank.getX());
        let offsetY = y - mouseY - Obstacle.dimension + this.tank.getY();
        console.log(offsetX + " " + offsetY)
        for (let i = this.nObstacles - 1; i >= 0; i--) {
            let o = this.obstacles[i]
            if (offsetX >= o.getCurrentX() && offsetX <= o.getCurrentX() + Obstacle.dimension
                && offsetY <= o.getCurrentY() && offsetY >= o.getCurrentY() - Obstacle.dimension)
                return i
        }
        return -1
    }
}