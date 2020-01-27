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

        this.posX = 0
        this.posY = 0

        this.framesX = 8
        this.framesY = 8
        // this.dx = this.width/this.framesX;

        this.framesIndexX = 0
        this.framesIndexY = 0

        //orientation
        this.orientation = "UP"
        this.velocity = 15
        this.eventListeners(framesCounter)

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

    eventListeners(framesCounter) {
        document.addEventListener("keydown", e => {
            // debugger
            switch (e.keyCode) {
                case this.keys.DOWN:
                    (this.orientation !== `DOWN`) && (this.orientation = `DOWN`)
                    break
                case this.keys.UP:
                    (this.orientation !== `UP`) && (this.orientation = `UP`)
                    break
                case this.keys.LEFT:
                    (this.orientation !== `LEFT`) && (this.orientation = `LEFT`)
                    break
                case this.keys.RIGHT:
                    (this.orientation !== `RIGHT`) && (this.orientation = `RIGHT`)
                    break
                case this.keys.ATTACK:
                    moveSword()
                break
            }
            this.animateMovement(this.orientation, framesCounter)
            this.move(this.orientation)

        });
    } // (this.orientation !== `DOWN`) ? this.orientation = `DOWN` : null

    animateMovement(orientation, framesCounter) {
        if (framesCounter % 10 === 0) {
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
    }
    move(orientation) {
        switch (orientation) {
            case "DOWN":
                if (this.posY <= this.gameHeight - 50) {
                    this.posY += this.velocity
                    console.log("MOVING DOWN!")
                }
                //ternary: 
                //(this.posY <= this.gameHeight) ? (this.posY += this.velocity) : null
                break
            case "UP": //change 0? to see character
                // (this.posY >= 0) ? (this.posY -= this.velocity) : null
                if (this.posY >= 0) {
                    this.posY -= this.velocity
                    console.log("MOVING UP!")
                }
                break
            case "LEFT":
                if (this.posX >= 0) {
                    this.posX -= this.velocity
                    console.log("MOVING LEFT!")
                }

                break
            case "RIGHT":
                if (this.posX <= this.gameHeight - 100) {
                    this.posX += this.velocity
                    console.log("MOVING RIGHT!")
                }

                break
        }
    }
}