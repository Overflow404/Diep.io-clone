import { Destroyer } from "./Destroyer"
import { RocketGun } from "./RocketGun"
import { Twin } from "./Twin"
import { World } from "./World";
import { ActionBehavior } from "./ActionBehavior";
import { Obstacle } from "./Obstacle";
import { StreamLiner } from "./StreamLiner";
import { Tank } from "./Tank";
import { TwinGun } from "./TwinGun";
let canvasContext: CanvasRenderingContext2D
let canvas: HTMLCanvasElement
let player: Tank
let world: World
let actionBehavior: ActionBehavior
let switchClass = true
let startDrag = false
let canChangeClass = true
let firstDrag = true
let toDrag = -1

enum AllowedMovement {
    All = 0,
    LeftOrRight = 1,
    UpOrDown = 2,
    None = 3
}

let allowedMovement = AllowedMovement.All

let keyCode = {
    W: 87,
    S: 83,
    A: 65,
    D: 68,
    Q: 81,
    SPACE: 32
}

let mouse = {
    x: 0,
    y: 0
}

/* To store pressed keys. */
let keys = [];

window.onresize = () => {
    resizeCanvas()
    let offsetX = canvas.width / 2 - player.getX()
    let offsetY = canvas.height / 2 + player.getY()
    setCanvasOrigin(offsetX, offsetY)
}

function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

function setCanvasOrigin(x: number, y: number) {
    canvasContext.translate(x, y)
    canvasContext.scale(1, -1)
}

window.onload = () => {
    initCanvas()
    setupCanvas()
    initWorld()
    initPlayer()
    renderLoop()
}

function initCanvas() {
    canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
    canvasContext = canvas.getContext("2d")
    canvasContext.imageSmoothingEnabled = true;
}

function setupCanvas() {
    resizeCanvas()
    setCanvasOrigin(canvas.width / 2, canvas.height / 2)
}

function initPlayer() {
    actionBehavior = new TwinGun(canvasContext, world)
    player = new Twin(world)
    world.add(player)
    canvas.addEventListener('mousedown', function () {
        toDrag = world.obstacleInMouse(mouse.x, mouse.y, canvas.width / 2, canvas.height / 2)
        if (toDrag != -1) { startDrag = true }
    })

    canvas.addEventListener('mouseup', function () {
        if (startDrag) {
            startDrag = false
            firstDrag = true
        }
    })
}

function initWorld() { world = new World(canvasContext) }

function renderLoop() {
    updatePositions()
    clearCanvas()
    render()
    window.requestAnimationFrame(() => renderLoop())
}

function render() {
    renderWorld()
    renderPlayer()
    renderBullets()
}

function renderWorld() {
    world.drawBoundary()
    world.drawObstacles()
}

function renderBullets() {
    if (actionBehavior.thereAreBulletsFired()) {
        actionBehavior.renderBullets(player.getX(), player.getY())
    }
}

function renderPlayer() {
    //offsetX and offsetY to calculate the angle between mouse and tank.
    let offsetX = mouse.x - canvas.width / 2
    let offsetY = mouse.y - canvas.height / 2
    player.display(canvasContext, offsetX, offsetY)
}

function clearCanvas() {
    canvasContext.save()
    canvasContext.resetTransform()
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.restore()
}

document.onkeydown = (e) => { keys[e.which] = true }
document.onkeyup = (e) => { keys[e.which] = false }

function updatePositions() {
    if (keys[keyCode.W]) {
        player.moveUp()
        world.moveDown()
    }

    if (keys[keyCode.S]) {
        player.moveDown()
        world.moveUp()
    }

    if (keys[keyCode.A]) {
        player.moveLeft()
        world.moveRight()
    }

    if (keys[keyCode.D]) {
        player.moveRight()
        world.moveLeft()
    }

    if (keys[keyCode.SPACE]) {
        actionBehavior.fire(player.getX(), world.getX(), player.getY(), world.getY(), player.getAngle())
    }

    if (keys[keyCode.Q]) {
       // if (canChangeClass) {
            //let x = player.getX()
            //let y = player.getY()
            //let velX = player.getVelocityX()
            //let velY = player.getVelocityY()
            //if (switchClass) {
            //    actionBehavior = new RocketGun(canvasContext, world)
            //    player = new Destroyer(world)
             //   switchClass = !switchClass

            //} else if (!switchClass) {
            //    actionBehavior = new TwinGun(canvasContext, world)
            //    player = new Twin(world)
            //    switchClass = !switchClass
            //}
            //player.setX(x)
            //player.setY(y)
            //player.setVelocityX(velX)
            //player.setVelocityY(velY)
            //canChangeClass = false
            //setTimeout(function wait() { canChangeClass = true }, 1000)
        //}
    }

    allowedMovement = player.updateState()
    updateWorldState()
    updateBulletsPosition()
}

function updateWorldState() {
    world.updateState()
    if (allowedMovement === AllowedMovement.All) {
        canvasContext.translate(0, world.getVelocityY())
        canvasContext.translate(world.getVelocityX(), 0)
    } else if (allowedMovement === AllowedMovement.LeftOrRight) {
        canvasContext.translate(world.getVelocityX(), 0)
    } else if (allowedMovement === AllowedMovement.UpOrDown) {
        canvasContext.translate(0, world.getVelocityY())
    }
}

function updateBulletsPosition() {
    actionBehavior.updateBulletsPosition()
}

//Scostamento tra bound ostacolo e mouse
let deltaX = 0
let deltaY = 0

window.onmousemove = (e) => {
    mouse.x = e.offsetX
    mouse.y = e.offsetY
    if (startDrag && world.obstacles[toDrag] != undefined) {
        world.obstacles[toDrag].setFriend()
        let startX = world.obstacles[toDrag].getCurrentX()
        let startY = world.obstacles[toDrag].getCurrentY()
        let currentX = mouse.x - canvas.width / 2 + player.getX();
        console.log("  " + player.getX())
        let currentY = canvas.height / 2 - mouse.y - Obstacle.dimension + player.getY();
        if (firstDrag) {
            deltaX = currentX - startX
            deltaY = currentY - startY
            firstDrag = false
        }
        let offsetX = currentX - Math.abs(deltaX)
        let offsetY = currentY + Math.abs(deltaY)
        if (offsetX >= world.getRightBound()) return
        if (offsetX <= world.getLeftBound()) return
        if (offsetY <= world.getBottomBound()) return
        if (offsetY >= world.getTopBound()) return
        world.obstacles[toDrag].setCurrentX(offsetX)
        world.obstacles[toDrag].setCurrentY(offsetY)
    }
}
