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

        this.vel = 1
        this.direction = 1

        this.framesX = 2
        this.framesY = 2
        // this.dx = this.width/this.framesX;

        this.dx = 0
        this.dy = 0

        this.posX = this.random(this.gameWidth - this.width - 20, 0)
        this.posY = this.random(this.gameHeight - this.height - 20, 0)

        this.widthRdm = this.width * this.random(3, 2)
        this.heightRdm = this.height * this.random(3, 2)
    }
    draw() {
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

    }

    random(max, min) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    animate(framesCounter) {
        console.log(this.posX)
        if (framesCounter % 30 === 0) {
            (this.posX += this.velX * this.direction)
        }
        if (this.posX >= this.gameHeight - 100) {
            (this.direction = -1)
        }
        if (this.posX <= 0) {
            (this.direction = 1)
        }
    }
    move() {
        // let random = random(this.gameHeight - 100, 0)
        (this.posX += this.vel * this.direction*2)
        if ((this.posX >= this.gameWidth - 100)) { //|| (this.PosX <random)) {
        this.direction =-1
        }
        if (this.posX <= 0) {
        this.direction = 1
        }
        
    }




}

//   move() {
//       let random = random(500, 300)
//           (this.posX += this.vel * this.direction)
//       if (this.posX >= this.gameHeight - 100) {
//           (this.direction = -1)
//       }
//       if (this.posX <= 0) {
//           (this.direction = 1)
//       } else if {


//       }
//   }