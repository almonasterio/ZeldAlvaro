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
    life: 200,
    lifeConst: 200,
    flag: false,
    gameOverImg: new Image(),
    colorLife: "red",
    youWinImg: new Image(),
    pointsToWin: 10,
    level: 0,







    init() {
        this.canvas = document.getElementById(`canvas`)
        this.ctx = this.canvas.getContext(`2d`)

        this.width = 1000 //window.innerWidth
        this.height = 1000 //window.innerHeight

        this.canvas.width = this.width
        this.canvas.height = this.height
        this.gameOverImg.src = "./images/kisspng-united-states-fambine-vostochny-cosmodrome-author-game-over-5b0c4d5026ac69.8576348115275328801584.png",
            this.youWinImg.src = "./images/kisspng-youtube-80-days-video-game-logo-win-5b0c202abef773.4724641315275213227822.png"

        this.start()
    },

    start() {
        const life = this.life
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
            this.collisionsPlayerGhosts(this.player, this.enemiesArray)
            this.collisionsGhostPlayer(this.enemiesArray, this.player)
            this.drawBoard()
            if (this.life <= 0) {
                this.gameOver()
            } else if (this.counterHits === this.pointsToWin) {
                this.youWin()
            }
            if (this.life <= this.lifeConst * 0.2) {
                this.colorLife = "#bf0202"
            } else if (this.life <= this.lifeConst * 0.4) {
                this.colorLife = "#ea8e0a"
            } else if (this.life <= this.lifeConst * 0.6) {
                this.colorLife = "#90bf45"
            } else if (this.life > this.lifeConst * 0.8) {
                this.colorLife = "#2ea937"
            }




        }, 1000 / this.FPS);
    },


    reset() {
        this.background = new Background(this.ctx, this.width, this.height)
        this.player = new Player(this.ctx, this.width, this.height, this.keys, this.framesCounter)
        this.score = new scoreBoard(this.ctx, this.width, this.height)



    },
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

    drawAll(framesCounter, life) {
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
        ghosts.forEach((ghost, idx) => {
            if (this.detectCollisionsGhostPlayer(ghost, player)) {
                ghost.changeDirection()
                this.life -= 10
                if (this.life < 0) {
                    this.life = 0
                }

            }
        })
    },
    detectCollisionsGhostPlayer(ghost, player) {
        if (
            ghost.posX + ghost.width - 20 >= player.posX && //ghost left player right ok
            ghost.posX + 40 < player.posX + player.width && //ghost right player left ok
            ghost.posY + 40 < player.posY + player.height && //ghost hitting from below OK
            ghost.posY + ghost.height > player.posY + 20 //ghost hitting from top OK
        ) {
            return true;
        }
    },
    collisionsPlayerGhosts(player, ghosts) {
        let collidedGhostIndex;
        ghosts.forEach((ghost, idx) => {
            if ((this.player.attacking) && (this.detectCollisionsPlayerGhosts(player, ghost))) {
                collidedGhostIndex = idx
                this.counterHits++
            }
        })
        if (collidedGhostIndex !== undefined) ghosts.splice(collidedGhostIndex, 1)
    },
    detectCollisionsPlayerGhosts(player, ghost) {
        if (
            player.posX + player.width + 5 >= ghost.posX && //ok player attack right
            player.posX < ghost.posX + ghost.width && //ok player attack left
            player.posY - 5 < ghost.posY + ghost.height && //?ok player attack up
            player.posY + player.height > ghost.posY //ok player attack down
        ) {
            return true;
        }
    },

    gameOver() {
        this.ctx.drawImage(
            this.gameOverImg,
            this.width / 2 - this.gameOverImg.width + 20,
            this.height / 2 - this.gameOverImg.height,
            this.gameOverImg.width * 2,
            this.gameOverImg.height * 2,
        )
        setTimeout(() => clearInterval(this.interval), 500)
    },

    youWin() {


        setTimeout(() => clearInterval(this.interval), 2000)
        this.ctx.drawImage(
            this.youWinImg,
            this.width / 2 - this.youWinImg.width / 2 - 50,
            this.height / 2 - this.youWinImg.height / 2,
            this.youWinImg.width,
            this.youWinImg.height)



    },

    drawBoard() {
        const lifeWidth = this.life;

        this.ctx.fillStyle = "white";
        this.ctx.font = '2em  "Uncial Antiqua"'
        this.ctx.fillText("LIFE", this.score.posX, this.score.posY)
        this.ctx.fillStyle = `${this.colorLife}`;
        this.ctx.fillRect(this.score.posX + 120, this.score.posY - 20, this.life, this.score.height);

        this.ctx.lineWidth = this.score.height * 0.2;
        this.ctx.strokeStyle = "white";
        this.ctx.strokeRect(this.score.posX + 120, this.score.posY - 20, lifeWidth, this.score.height);

        this.ctx.fillStyle = "white";
        this.ctx.font = '2em  "Uncial Antiqua"'
        this.ctx.fillText(`SCORE ${this.counterHits}`, this.score.posX, this.score.posY + 40)
        // this.ctx.fillStyle = `blue`;
        // this.ctx.fillRect(this.score.posX + 120, this.score.posY + 20, this.counterHits, this.score.height);

        // this.ctx.lineWidth = this.score.height * 0.2;
        // this.ctx.strokeStyle = "#e4ddd3";
        // this.ctx.strokeRect(this.score.posX + 120, this.score.posY + 20, this.pointsToWin, this.score.height);
        this.ctx.fillStyle = "white";
        this.ctx.font = '2em  "Uncial Antiqua"'
        this.ctx.fillText(`GOAL ${this.pointsToWin}`, this.pointsToWin + 300, this.score.posY + 40)



    },








}