class Player {
    constructor(ctx, gameWidth, gameHeight, keys) {

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
        this.framesY = 9
        // this.dx = this.width/this.framesX;

        this.framesIndexX = 0
        this.framesIndexY = 0

        //orientation
        this.orientation = "UP"
        this.velocity = 2

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
        this.animateDown(framesCounter)
    }

    eventListeners() {
        document.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case this.keys.DOWN:
                    if (this.orientation !== `DOWN`) {
                        this.orientation = `DOWN`

                    }

                    if (this.posY <= this.gameHeight) {
                        this.posY += this.velocity;
                        console.log("DOWN!");
                    }
                    break;
            }
            this.animate(this.orientation)
            this.moveDown()
        });
    }

    animate(framesCounter) {
        this.framesIndexY = 1
        if (framesCounter % 10 === 0) {
            this.framesIndexX++
        }
        if (this.framesIndexX >= this.framesX) {
            this.framesIndexX = 0
        }


    }




    turnPlayer() {

        switch (this.orientation) {
            case "N":
                this.orientation = "W";
                break;
            case "E":
                this.orientation = "N";
                break;
            case "S":
                this.orientation = "E";
                break;
            case "W":
                this.orientation = "S";
                break;
        }
    }


    move(orientation) {


        this.posY += this.velocity


    }






}