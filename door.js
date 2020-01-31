class Door {
    constructor(ctx, gameWidth, gameHeight, framesCounter) {

        this.ctx = ctx;
        //sin uso yet:
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight

        this.width = 100
        this.height = 140

        this.open =false;


        this.image = new Image()
        this.image.src = "./images/skull door animated sprite sheet.png"

        this.posX = this.gameWidth/2-this.width/2
        this.posY = this.gameHeight/2-this.height*2

        this.framesX = 6

        // this.dx = this.width/this.framesX;

        this.framesIndexX = 0


    }

    draw() {
        this.ctx.drawImage(
            this.image,
            this.framesIndexX * Math.floor(this.image.width / this.framesX),
            0,
            Math.floor(this.image.width / this.framesX),
            Math.floor(this.image.height),
            this.posX,
            this.posY,
            this.width,
            this.height
        )
    }

    animate(framesCounter) {
        if (framesCounter % 10 === 0) {
            this.framesIndexX++

        }
        if (this.framesIndexX >=this.framesX) {
            this.framesIndexX=this.framesX-1
        }



    }

}