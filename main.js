const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 60,
    framesCounter: 0,
    keys: {
        //Arrow Keys
        UP: 87,
        DOWN: 83,
        LEFT: 65,
        RIGHT: 68,
        ATTACK: 88, //32,
    },
    enemiesArray: [],
    collisionGhost: false,
    counterHits: 0,
    life: 99,
    flag: false,
    gameOverImg: new Image(),





    init() {
        this.canvas = document.getElementById(`canvas`)
        this.ctx = this.canvas.getContext(`2d`)

        this.width = 900 //window.innerWidth
        this.height = 900 //window.innerHeight

        this.canvas.width = this.width
        this.canvas.height = this.height
        this.gameOverImg.src = "./images/gameOver.png",


            this.start()
    },

    start() {
        this.reset()
        this.drawAll();
        this.interval = setInterval(() => {
            if (this.framesCounter > 5000) {
                this.framesCounter = 0;
            }
            this.framesCounter++;
            this.clear();
            this.drawAll(this.framesCounter);
            this.moveAll()
            this.collisionsGhostPlayer(this.enemiesArray, this.player)
            this.drawLife()
            if (this.life < 0) {
                this.gameOver()
            }
            console.log(this.life)

        }, 1000 / this.FPS);
    },


    reset() {
        this.background = new Background(this.ctx, this.width, this.height)
        this.player = new Player(this.ctx, this.width, this.height, this.keys, this.framesCounter)



    },
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

    drawAll(framesCounter) {
        this.background.draw()
        this.player.draw();
        this.generateEnemies(framesCounter)
        this.enemiesArray.forEach(enemy => enemy.draw(framesCounter))

    },
    moveAll(framesCounter) {
        this.enemiesArray.forEach(enemy => enemy.move(framesCounter))
    },
    generateEnemies(framesCounter) {
        if ((framesCounter % 200 === 0) && (this.enemiesArray.length <= 10)) {
            // while (this.enemiesArray.length <= 10) {
            this.enemiesArray.push(new Enemy(this.ctx, this.width, this.height, framesCounter))
            // }
        }
    },

    collisionsGhostPlayer(ghosts, player) {
        ghosts.forEach(ghost => {
            if (this.detectCollisions(ghost, player)) {
                ghost.changeDirection()
                this.life -= 100
            }
        })
    },

    detectCollisions(ghost, player) {
        if (
            ghost.posX + ghost.width >= player.posX &&
            ghost.posX + 30 < player.posX + player.width &&
            ghost.posY + 50 < player.posY + player.height &&
            ghost.posY - 50 + ghost.height > player.posY
        ) {
            return true;
        }
    },

    drawLife() {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(10, 10, this.life, 20);

    },

    gameOver() {
        setTimeout(this.ctx.drawImage(
            this.gameOverImg,
            this.width / 2 - this.gameOverImg.width / 6,
            this.height / 2 - this.gameOverImg.height / 6,
            this.gameOverImg.width / 3,
            this.gameOverImg.height / 3,
        ), 1000)
        clearInterval(this.interval)
    },


}