import { ActionBehavior } from "./ActionBehavior";
import { Tank } from "./Tank"
import { World } from "./World"
import { Obstacle } from "./Obstacle";

export class Destroyer extends Tank {

    private canvasContext: CanvasRenderingContext2D
    private world: World
    private destroyer = {
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
        movSpeed: 1,
    }

    constructor(world: World) {
        super()
        this.world = world
        this.setBound(world.getWidth(), world.getHeight())
    }

    display(canvasContext: CanvasRenderingContext2D, offsetX, offsetY) {
        this.lazyInitCanvasContext(canvasContext)
        this.drawTank(offsetX, offsetY)
    }

    moveDown() { if (this.destroyer.velocityY > -this.destroyer.speed) this.destroyer.velocityY-= this.destroyer.movSpeed }
    moveLeft() { if (this.destroyer.velocityX > -this.destroyer.speed) this.destroyer.velocityX-= this.destroyer.movSpeed }
    moveRight() { if (this.destroyer.velocityX < this.destroyer.speed) this.destroyer.velocityX+= this.destroyer.movSpeed }
    moveUp() { if (this.destroyer.velocityY < this.destroyer.speed) this.destroyer.velocityY+= this.destroyer.movSpeed}
    getSpeed() { return this.destroyer.speed }
    getVelocityX() { return this.destroyer.velocityX }
    getAngle() { return this.destroyer.angle }
    getVelocityY() { return this.destroyer.velocityY }
    setVelocityY(v: number) { this.destroyer.velocityY = v }
    setVelocityX(v: number) { this.destroyer.velocityX = v }
    getFriction() { return this.destroyer.friction }
    getRadius() { return this.destroyer.radius }
    setAngle(v: number) { this.destroyer.angle = v}
    incMovSpeed() {this.destroyer.movSpeed+=0.1}
    
    updateState() : number {
        this.destroyer.velocityY *= this.destroyer.friction;
        this.tank.y += this.destroyer.velocityY;
        this.destroyer.velocityX *= this.destroyer.friction;
        this.tank.x += this.destroyer.velocityX;
        this.detectCollision()
        return this.checkBounds()
    }

    private drawTank(offsetX: number, offsetY: number) {
        let newOffset = this.calculateOffset(offsetX, offsetY) 
        this.drawCannon(newOffset.x, newOffset.y)
        this.drawBody()
    }

    private calculateOffset(offsetX: number, offsetY: number) {
        this.destroyer.angle = Math.atan2(offsetX, offsetY) - Math.PI / 2;
        let x = this.destroyer.radius * this.destroyer.cannonLength * Math.cos(this.destroyer.angle) + this.tank.x
        let y = this.destroyer.radius * this.destroyer.cannonLength * Math.sin(this.destroyer.angle) + this.tank.y
        return {x, y}
    }

    private drawCannon(x: number, y:number) {
        this.canvasContext.beginPath()
        this.canvasContext.lineWidth = this.destroyer.cannonWidth
        this.canvasContext.strokeStyle = this.destroyer.cannonColor
        this.canvasContext.moveTo(this.tank.x, this.tank.y)
        this.canvasContext.lineTo(x, y)
        this.canvasContext.stroke()
        this.canvasContext.lineWidth = 1
        this.canvasContext.strokeStyle = 'black'
        this.canvasContext.closePath()
    }

    private drawBody() {
        this.canvasContext.beginPath()
        this.canvasContext.fillStyle = this.destroyer.bodyColor
        this.canvasContext.arc(this.tank.x, this.tank.y, this.destroyer.radius, 0, 2 * Math.PI)
        this.canvasContext.fill()
        this.canvasContext.stroke()
        this.canvasContext.closePath()
    }

    private lazyInitCanvasContext(canvasContext: CanvasRenderingContext2D) {
        if (this.canvasContext == undefined) {
            this.canvasContext = canvasContext
        }
    }

    private detectCollision() {
        //Body collision
        let obstacles = this.world.obstacles
        for (var j = 0; j < obstacles.length; j++) {
            if (obstacles[j].isFriend()) continue
            let circleR = this.destroyer.radius
            let rectW = Obstacle.dimension, rectH = Obstacle.dimension
            let circleDistanceX = Math.abs(this.tank.x - obstacles[j].getCurrentX());
            let circleDistanceY = Math.abs(this.tank.y - obstacles[j].getCurrentY());

            if (circleDistanceX > (rectW / 2 + circleR)) { continue }
            if (circleDistanceY > (rectH / 2 + circleR)) { continue }

            if (circleDistanceX <= (rectW / 2)) {
                obstacles[j].setToRemove();
                break
            }
            if (circleDistanceY <= (rectH / 2)) {
                obstacles[j].setToRemove();
                break
            }

            let cornerDistance_sq = (circleDistanceX - rectW / 2) ^ 2 +
                (circleDistanceY - rectH / 2) ^ 2;
            if (cornerDistance_sq <= (circleR ^ 2)) {
                obstacles[j].setToRemove();
                break
            }
        }
    }
}