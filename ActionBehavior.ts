export interface ActionBehavior {
    fire(playerX: number, worldX: number, playerY: number, worldY: number, alpha: number): void
    updateBulletsPosition(): void
    thereAreBulletsFired(): boolean
    renderBullets(x: number, y: number): void
}