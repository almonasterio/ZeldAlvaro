class scoreBoard {
    constructor(ctx, gameWidth, gameHeight,life, framesCounter) {

        this.ctx = ctx
        this.width = 400
        this.height = 20
        this.score = 0
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.framesCounter = framesCounter
        this.posX = 30
        this.posY = 40
        this.life = life

    }


    draw(life) {
        //life bar
        // this.ctx.fillStyle = "red";
        // this.ctx.font = '1.8em  "Uncial Antiqua"'
        // this.ctx.fillText("LIFE", this.posX, this.posY)
        // this.ctx.fillStyle = "red";
        // this.ctx.fillRect(this.posX+10, this.posY+10, life, 20);

        // this.ctx.fillStyle = "#ff553f";
        // this.ctx.fillRect(this.posX, this.posY + this.height / 2, this.scoreWidth, this.height)

        // this.ctx.fillStyle = "#e4ddd3";
        // this.ctx.font = '0.8em "Press Start 2P"'
        // this.ctx.fillText("VINCENT", this.posX, this.posY)

        // this.ctx.fillStyle = "#e4ddd3";
        // let levelText = `${life}`;
        // let levelWidth = this.ctx.measureText(levelText).width;
        // this.ctx.fillText(`LEVEL ${this.level}`, this.posX + this.width - levelWidth, this.posY)

        // this.ctx.lineWidth = this.height * 0.2;
        // this.ctx.strokeStyle = "#e4ddd3";
        // this.ctx.strokeRect(this.posX, this.posY + this.height / 2, this.width, this.height)
    }
}



// init: function (ctx, gameWidth, bgWidth, bgHeight, level) {
//     this.ctx = ctx;
//     this.width = bgWidth / 4;
//     this.height = bgHeight / 32;
//     this.posX = (gameWidth - bgWidth) / 2 + bgWidth / 20;
//     this.posY = bgHeight / 16;
//     this.scoreWidth = this.width / 2;

// },

// drawLife() {
//     this.ctx.fillStyle = "red";
//     this.ctx.fillRect(10, 10, this.life, 20);

// },