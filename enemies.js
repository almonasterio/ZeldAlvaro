class Enemy {
    constructor(ctx, gameWidth, gameHeight, framesCounter) {

        this.ctx = ctx
        this.width = 40
        this.height = 50

        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.framesCounter = framesCounter

        this.image = new Image()
        this.image.src = "./images/ghostOnly.png"

        this.vel = 1 * this.random(2, 1)
        this.direction = 1

        this.framesX = 2
        this.framesY = 2


        this.dx = 0
        this.dy = 0

        this.posX = this.random(this.gameWidth - this.width - 20, 0)
        this.posY = this.random(this.gameHeight - this.height - 20, 75)

        this.widthRdm = this.width * this.random(3, 2)
        this.heightRdm = this.height * this.random(3, 2)
    }
    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.dx * Math.floor(this.image.width / this.framesX),
            this.dy * Math.floor(this.image.height / this.framesY),
            Math.floor(this.image.width / this.framesX),
            Math.floor(this.image.height / this.framesY),
            this.posX,
            this.posY,
            this.widthRdm,
            this.heightRdm
        )
        this.animate(framesCounter)

    }

    random(max, min) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    animate(framesCounter) {
        if (framesCounter % 30 === 0) {
            if (this.direction === 1) {
                this.dy = 0
                this.dx++
                if (this.dx > this.framesX - 1) {
                    this.dx = 0
                }
            } else if (this.direction === -1) {
                this.dy = 1
                this.dx++

                if (this.dx > this.framesX - 1) {
                    this.dx = 0
                }
            }
        }
    }

    move() {
        (this.posX += this.vel * this.direction * this.random(3, 1.5)) //
        if ((this.posX >= this.gameWidth - 50)) { //|| (this.PosX <random)) { *Math.random()
            this.direction = -1
        }
        if (this.posX <= 0) {
            this.direction = 1
        }

    }
    changeDirection() {
        this.direction *= -1

    }


}