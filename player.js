class Player {
    constructor(ctx, gameWidth, gameHeight, keys, framesCounter) {

        this.ctx = ctx;
        //sin uso yet:
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight

        this.width = 100
        this.height = 100

        this.keys = keys

        this.image = new Image()
        this.image.src = "./images/sprite-alvaro.png"

        this.posX = this.gameWidth / 2
        this.posY = this.gameHeight / 2

        this.framesX = 8
        this.framesY = 8
        // this.dx = this.width/this.framesX;

        this.framesIndexX = 0
        this.framesIndexY = 0

        //orientation
        this.orientation = "DOWN"
        this.velocity = 15
        this.eventListeners(framesCounter)
        this.attacking = false

    }

    draw(framesCounter) {

        this.ctx.drawImage(
            this.image,
            this.framesIndexX * Math.floor(this.image.width / this.framesX),
            this.framesIndexY * Math.floor(this.image.height / this.framesY),
            Math.floor(this.image.width / this.framesX),
            Math.floor(this.image.height / this.framesY),
            this.posX,
            this.posY,
            this.width,
            this.height
        )

    }

    eventListeners() {
        document.addEventListener("keydown", e => {
            if (e.keyCode === this.keys.ATTACK) {
                // if (!this.attacking) {
                // this.attacking = true;
                this.animateSword(this.orientation)
                // }
            }

        })
        // document.addEventListener("onkeyup", e => {
        //         if (e.keyCode === this.keys.ATTACK) {
        //             this.attacking = false;
        //         }
        //     })

        document.addEventListener("keydown", e => {
            const keys = this.keys
            let validKeys = [keys.DOWN, keys.UP, keys.LEFT, keys.RIGHT]
            if (validKeys.lastIndexOf(e.keyCode) === -1) return
            switch (e.keyCode) {
                case this.keys.ATTACK:
                    this.animateSword(this.orientation)
                    return
                case this.keys.DOWN:
                    this.orientation = `DOWN`
                    break
                case this.keys.UP:
                    this.orientation = `UP`
                    break
                case this.keys.LEFT:
                    this.orientation = `LEFT`
                    break
                case this.keys.RIGHT:
                    this.orientation = `RIGHT`
                    break
            }
            this.animateMovement(this.orientation)
            this.move(this.orientation)
        });


    }

    animateMovement(orientation) {

        switch (orientation) {
            case "DOWN":
                this.framesIndexY = 0
                this.framesIndexX++
                if (this.framesIndexX >= this.framesX) {
                    this.framesIndexX = 0
                }
                break
            case "UP":
                this.framesIndexY = 1
                this.framesIndexX++
                if (this.framesIndexX >= this.framesX) {
                    this.framesIndexX = 0
                }
                break
            case "LEFT":
                this.framesIndexY = 2
                this.framesIndexX++
                if (this.framesIndexX >= 6) {
                    this.framesIndexX = 0
                }

                break
            case "RIGHT":
                this.framesIndexY = 3
                this.framesIndexX++
                if (this.framesIndexX >= 6) {
                    this.framesIndexX = 0
                }
                break
        }

    }
    move(orientation) {
        switch (orientation) {
            case "DOWN":
                (this.posY <= this.gameHeight - 100) && (this.posY += this.velocity)
                break
            case "UP":
                (this.posY >= 0) && (this.posY -= this.velocity)
                break
            case "LEFT":
                (this.posX >= 0) && (this.posX -= this.velocity)
                break
            case "RIGHT":
                (this.posX <= this.gameHeight - 100) && (this.posX += this.velocity)
                break
        }
    }

    animateSword(orientation) {
        this.framesIndexX = 0
        this.intervalID = setInterval(() => {
            switch (orientation) {
                case "DOWN":
                    this.framesIndexY = 5
                    if (++this.framesIndexX > 5) {
                        this.framesIndexX = 0
                        this.framesIndexY = 0
                        clearInterval(this.intervalID)
                    }
                    break
                case "UP":
                    this.framesIndexY = 4
                    if (++this.framesIndexX > 4) {
                        this.framesIndexX = 0
                        this.framesIndexY = 1
                        clearInterval(this.intervalID)
                    }
                    break
                case "LEFT":
                    this.framesIndexY = 6
                    if (++this.framesIndexX > 4) {
                        this.framesIndexX = 0
                        this.framesIndexY = 2
                        clearInterval(this.intervalID)
                    }
                    break
                case "RIGHT":
                    this.framesIndexY = 7
                    if (++this.framesIndexX > 4) {
                        this.framesIndexX = 0
                        this.framesIndexY = 3
                        clearInterval(this.intervalID)
                    }
                    break
            }
        }, 1000 / 20);
    }
}