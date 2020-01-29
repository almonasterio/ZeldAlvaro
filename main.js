const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 60,
    framesCounter: 0,
    keys: {
        //Arrow Keys
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        ATTACK: 32, //32,
    },
    enemiesArray: [],
    collisionGhost: false,
    counterHits: 0,
    life: 100,
    flag: false,
    gameOverImg: new Image(),





    init() {
        this.canvas = document.getElementById(`canvas`)
        this.ctx = this.canvas.getContext(`2d`)

        this.width = 1000 //window.innerWidth
        this.height = 1000 //window.innerHeight

        this.canvas.width = this.width
        this.canvas.height = this.height
        this.gameOverImg.src = "./images/kisspng-united-states-fambine-vostochny-cosmodrome-author-game-over-5b0c4d5026ac69.8576348115275328801584.png",


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
            this.drawAll(this.framesCounter, this.life);
            this.moveAll()
            this.collisionsGhostPlayer(this.enemiesArray, this.player)
            this.drawLife()
            if (this.life <= 0) {
                this.gameOver()
            }

        }, 1000 / this.FPS);
    },


    reset() {
        this.background = new Background(this.ctx, this.width, this.height)
        this.player = new Player(this.ctx, this.width, this.height, this.keys, this.framesCounter)
        this.score = new scoreBoard(this.ctx, this.width, this.height, this.framesCounter)



    },
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

    drawAll(framesCounter, life) {
        this.background.draw()
        this.player.draw();
        this.generateEnemies(framesCounter)
        this.enemiesArray.forEach(enemy => enemy.draw(framesCounter))
        this.score.draw(framesCounter, life)

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
        let collidedGhostIndex;

        ghosts.forEach((ghost, idx) => {
            if ((this.player.attacking) && (this.detectCollisions(ghost, player))) {
                collidedGhostIndex = idx
            } else if (this.detectCollisions(ghost, player)) {
                ghost.changeDirection()
                this.life -= 100
            }
        })

        if (collidedGhostIndex !== undefined) ghosts.splice(collidedGhostIndex, 1)
    },


    detectCollisions(ghost, player) {
        if (
            ghost.posX + ghost.width >= player.posX &&
            ghost.posX + 10 < player.posX + player.width &&
            ghost.posY + 50 < player.posY + player.height &&
            ghost.posY - 50 + ghost.height > player.posY
        ) {
            return true;
        }
    },

    gameOver() {
        setTimeout(this.ctx.drawImage(
            this.gameOverImg,
            this.width / 2 - this.gameOverImg.width + 20,
            this.height / 2 - this.gameOverImg.height,
            this.gameOverImg.width * 2,
            this.gameOverImg.height * 2,
        ), 60)
        clearInterval(this.interval)
    },

    drawLife() {
        const lifeWidth = this.life

        this.ctx.fillStyle = "#e4ddd3";
        this.ctx.font = '1.8em  "Uncial Antiqua"'
        this.ctx.fillText("LIFE", this.score.posX, this.score.posY)
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.score.posX + 90, this.score.posY - 20, this.life, this.score.height);

        this.ctx.lineWidth = this.score.height * 0.2;
        this.ctx.strokeStyle = "#e4ddd3";
        this.ctx.strokeRect(this.score.posX + 90, this.score.posY - 20, lifeWidth, this.score.height)


    },

    // killEnemy() {
    //     if ((this.player.attacking)&&()
    // },


}