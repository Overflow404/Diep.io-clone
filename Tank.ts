export abstract class Tank {

    bound = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    tank = {
        x: 0,
        y: 0
    }

    allowedMovement = {
        all: 0,
        leftOrRight: 1,
        upOrDown: 2,
        none: 3
    }

    setBound(worldWidth: number, worldHeight: number) {
        this.bound.top = worldHeight / 2
        this.bound.bottom = -worldHeight / 2
        this.bound.right = worldWidth / 2
        this.bound.left = -worldWidth / 2
    }

    abstract display(canvasContext: CanvasRenderingContext2D, offsetX: number, offsetY: number): void
    abstract moveLeft(): void
    abstract moveRight(): void
    abstract moveUp(): void
    abstract moveDown(): void
    abstract getSpeed(): number
    abstract getAngle(): number
    abstract setAngle(v: number): void
    abstract getFriction(): number
    abstract getVelocityX(): number
    abstract setVelocityX(v: number)
    abstract setVelocityY(v: number)
    abstract getVelocityY(): number
    abstract getRadius(): number
    abstract updateState(): number
    abstract incMovSpeed(): void
    
    getX() { return this.tank.x }
    getY() { return this.tank.y }
    setX(v: number) { this.tank.x = v }
    setY(v: number) { this.tank.y = v }
    isOutOfTopBound() { return this.tank.y >= this.bound.top }
    isOutOfBottomBound() { return this.tank.y < this.bound.bottom }
    isOutOfRightBound() { return this.tank.x > this.bound.right }
    isOutOfLeftBound() { return this.tank.x < this.bound.left }

    checkBounds(): number {
        if (this.isOutOfTopBound()) {
            this.tank.y = this.bound.top;
            if (this.isOutOfRightBound()) {
                this.tank.x = this.bound.right;
                return this.allowedMovement.none
            } else if (this.isOutOfLeftBound()) {
                this.tank.x = this.bound.left;
                return this.allowedMovement.none
            }
            return this.allowedMovement.leftOrRight
        } else if (this.isOutOfBottomBound()) {
            this.tank.y = this.bound.bottom;
            if (this.isOutOfRightBound()) {
                this.tank.x = this.bound.right;
                return this.allowedMovement.none
            } else if (this.isOutOfLeftBound()) {
                this.tank.x = this.bound.left;
                return this.allowedMovement.none
            }
            return this.allowedMovement.leftOrRight
        }
        if (this.isOutOfRightBound()) {
            this.tank.x = this.bound.right;
            return this.allowedMovement.upOrDown
        } else if (this.isOutOfLeftBound()) {
            this.tank.x = this.bound.left;
            return this.allowedMovement.upOrDown
        }
        return this.allowedMovement.all
    }
}