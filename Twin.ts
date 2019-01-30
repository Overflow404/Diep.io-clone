import { ActionBehavior } from "./ActionBehavior";
import { Tank } from "./Tank"
import { World } from "./World"
import { Obstacle } from "./Obstacle";

export class Twin extends Tank {

    private canvasContext: CanvasRenderingContext2D
    private world: World
    private twin = {
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

    moveDown() { if (this.twin.velocityY > -this.twin.speed) this.twin.velocityY-= this.twin.movSpeed }
    moveLeft() { if (this.twin.velocityX > -this.twin.speed) this.twin.velocityX-= this.twin.movSpeed }
    moveRight() { if (this.twin.velocityX < this.twin.speed) this.twin.velocityX+= this.twin.movSpeed }
    moveUp() { if (this.twin.velocityY < this.twin.speed) this.twin.velocityY+= this.twin.movSpeed}
    getSpeed() { return this.twin.speed }
    getVelocityX() { return this.twin.velocityX }
    setVelocityX(v: number) { this.twin.velocityX = v }
    setAngle(v: number) { this.twin.angle = v}
    getAngle() { return this.twin.angle }
    getVelocityY() { return this.twin.velocityY }
    setVelocityY(v: number) { this.twin.velocityY = v }
    getFriction() { return this.twin.friction }
    getRadius() { return this.twin.radius }
    incMovSpeed() {this.twin.movSpeed+=0.1}
    setMovSpeed(v: number) { this.twin.movSpeed = v}
    getMovSpeed() { return this.twin.movSpeed}
    
    updateState() : number {
        this.twin.velocityY *= this.twin.friction;
        this.tank.y += this.twin.velocityY;
        this.twin.velocityX *= this.twin.friction;
        this.tank.x += this.twin.velocityX;
        this.detectCollision()
        return this.checkBounds()
    }

    private drawTank(offsetX: number, offsetY: number) {
        let newOffset = this.calculateOffset(offsetX, offsetY, 1) 
        this.drawCannon(newOffset.x, newOffset.y, 1)
        newOffset = this.calculateOffset(offsetX, offsetY, -1) 
        this.drawCannon(newOffset.x, newOffset.y, -1)
        this.drawBody()
    }

    private calculateOffset(offsetX: number, offsetY: number, direction: number) {
        this.twin.angle = Math.atan2(offsetX, offsetY) - Math.PI / 2;
        let x = this.twin.radius * this.twin.cannonLength * Math.cos(this.twin.angle) + (this.tank.x * direction)
        let y = this.twin.radius * this.twin.cannonLength * Math.sin(this.twin.angle) + (this.tank.y* direction)
        return {x, y}
    }

    private drawCannon(x: number, y:number, direction: number) {
        this.canvasContext.beginPath()
        this.canvasContext.lineWidth = this.twin.cannonWidth
        this.canvasContext.strokeStyle = this.twin.cannonColor
        this.canvasContext.moveTo(this.tank.x, this.tank.y)
        this.canvasContext.lineTo(x * direction, y * direction)
        this.canvasContext.stroke()
        this.canvasContext.lineWidth = 1
        this.canvasContext.strokeStyle = 'black'
        this.canvasContext.closePath()

    }

    private drawBody() {
        this.canvasContext.beginPath()
        this.canvasContext.fillStyle = this.twin.bodyColor
        this.canvasContext.arc(this.tank.x, this.tank.y, this.twin.radius, 0, 2 * Math.PI)
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
            let circleR = this.twin.radius
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