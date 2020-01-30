class Potion {
    constructor(ctx, gameWidth, gameHeight,framesCounter) {

        this.ctx = ctx
        this.width = 50
        this.height = 50

        this.framesCounter=framesCounter

        this.gameWidth = gameWidth
        this.gameHeight = gameHeight

        this.image = new Image()
        this.image.src = "./images/potion.png"

        this.posX = this.random(this.gameWidth - this.width - 20, 0)
        this.posY = this.random(this.gameHeight - this.height - 20, 0)
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            // this.dx * Math.floor(this.image.width / this.framesX),
            // this.dy * Math.floor(this.image.height / this.framesY),
            // Math.floor(this.image.width / this.framesX),
            // Math.floor(this.image.height / this.framesY),
            this.posX,
            this.posY,
            this.width,
            this.height
        )
        

    }

    random(max, min) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}