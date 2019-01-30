export class Bullet {
    private startX: number
    private startY: number
    private currentX: number
    private currentY: number
    private playerX: number
    private playerY: number
    private alpha: number
    private bulletFired: boolean
    private toRemove: boolean
    private opacity = 1
    private acceleration: number

    constructor(startX: number, startY: number,
        currentX: number, currentY: number,
        playerX: number, playerY: number,
        alpha: number, bulletFired: boolean, acceleration: number) {
            this.startX = startX
            this.startY = startY
            //Da dove parte il bullet?
            this.currentX = currentX
            this.currentY = currentY
            this.playerX = playerX
            this.playerY = playerY
            this.alpha = alpha
            this.bulletFired = bulletFired
            this.acceleration = acceleration
    }

    getStartX() { return this.startX }
    getStartY() { return this.startY }
    getCurrentX() { return this.currentX }
    getCurrentY() { return this.currentY }
    getPlayerX() { return this.playerX }
    getPlayerY() { return this.playerY }
    getAlpha() { return this.alpha }
    getToRemove() {return this.toRemove}
    getOpacity() {return this.opacity}
    getAcceleration() { return this.acceleration }
    incAcceleration() { this.acceleration += 0.03}
    setAcceleration(v: number) { this.acceleration = v}
    setStartX(v: number) { this.startX = v }
    setStartY(v: number) { this.startY = v }
    setCurrentX(v: number) { this.currentX += v }
    setCurrentY(v: number) { this.currentY += v }
    setPlayerX(v: number) { this.playerX = v }
    setPlayerY(v: number) { this.playerY = v }
    setAlpha(v: number) { this.alpha = v }
    setBulletFired(v: boolean) { this.bulletFired = v }
    setToRemove() {this.toRemove = true}
    decOpacity() { this.opacity -= 0.1}
    isBulletFired() { return this.bulletFired }
}