export class Obstacle {
    private position = {
        x: undefined,
        y: undefined
    }

    private state = {
        toRemove: undefined,
        opacity: 1,
        friend: false
    }

    static dimension = 30

    constructor(x: number, y: number) {
        this.position.x = x
        this.position.y = y
    }

    getCurrentX() { return this.position.x }
    getCurrentY() { return this.position.y }
    getOpacity() {return this.state.opacity}
    setCurrentX(v: number) { this.position.x = v }
    setCurrentY(v: number) { this.position.y = v }
    setToRemove() {this.state.toRemove = true}
    setFriend() {this.state.friend = true}
    decOpacity() { this.state.opacity -= 0.1}
    isToRemove() {return this.state.toRemove}
    isFriend() {return this.state.friend}
}