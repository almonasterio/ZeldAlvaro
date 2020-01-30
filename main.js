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
    potionArray: [],
    collisionGhost: false,
    counterHits: 0,
    lifeConst: 600,
    life: 600,

    flag: false,
    gameOverImg: new Image(),
    colorLife: "red",
    youWinImg: new Image(),
    pointsToWin: 1,
    level: 0,







    init() {
        this.canvas = document.getElementById(`canvas`)
        this.ctx = this.canvas.getContext(`2d`)

        // this.audioIntro.play()

        // setTimeout(() => this.audioIntro.pause(), 10000)


        this.width = 800 //window.innerWidth
        this.height = 800 //window.innerHeight

        this.canvas.width = this.width
        this.canvas.height = this.height
        this.gameOverImg.src = "./images/gameover.png",
            this.youWinImg.src = "./images/kisspng-youtube-80-days-video-game-logo-win-5b0c202abef773.4724641315275213227822.png"

        this.start()
    },

    start() {
        const life = this.life
        this.reset()
        this.drawAll()


        this.audioMain.play()


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
            this.collisionsPlayerPotion(this.player, this.potionArray)
            this.drawBoard()


            if (this.life <= 0) {
                this.gameOver()
            } else if (this.counterHits === this.pointsToWin) {
                this.youWin()
            }
            if (this.life <= this.lifeConst * 0.2) {
                this.colorLife = "#bf0202"
            } else if (this.life <= this.lifeConst * 0.5) {
                this.colorLife = "#ea8e0a"
            } else if (this.life <= this.lifeConst * 0.8) {
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
        this.audioLinkDies = new Sound('./sounds/link dies.wav')
        this.audioGameOver = new Sound('./sounds/Game Over Dracula Second Battle.wav');
        this.audioMain = new Sound('./sounds/Main-theme.mp3');
        this.audioGhostCollision = new Sound('./sounds/link hurt.wav');
        this.audioGhostKilled = new Sound('./sounds/enemy dies.wav');
        this.audioItem = new Sound('./sounds/item get 1.wav');
        this.audioPotion = new Sound('./sounds/item get 1.wav');
        this.audioLowHP = new Sound('./sounds/low hp.wav');
        this.audioWin = new Sound('./sounds/secret-sound.mp3');
        this.audioIntro = new Sound('./sounds/Intro-theme.mp3');


    },
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

    drawAll(framesCounter, life) {
        this.background.draw()
        this.generatePotion(framesCounter)
        this.generateEnemies(framesCounter)
        this.player.draw();

        this.enemiesArray.forEach(enemy => enemy.draw(framesCounter))
        this.potionArray.forEach(potion => potion.draw(framesCounter))


    },
    moveAll(framesCounter) {
        this.enemiesArray.forEach(enemy => enemy.move())

    },
    generateEnemies(framesCounter) {
        if ((framesCounter % 200 === 0) && (this.enemiesArray.length <= 10)) {
            // while (this.enemiesArray.length <= 10) {
            this.enemiesArray.push(new Enemy(this.ctx, this.width, this.height, framesCounter))
            // }
        }
    },

    generatePotion(framesCounter) {
        if ((framesCounter % 1000 === 0) && (this.life <= this.lifeConst * 0.8)) {
            this.potionArray.push(new Potion(this.ctx, this.width, this.height, framesCounter))
        }


    },

    collisionsGhostPlayer(ghosts, player) {
        ghosts.forEach((ghost, idx) => {
            if (this.detectCollisionsGhostPlayer(ghost, player)) {

                this.audioGhostCollision.play()
                ghost.changeDirection()
                this.life -= 100
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

                this.audioGhostKilled.play()
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
    collisionsPlayerPotion(player, potionArray) {
        let collidedPotion;
        potionArray.forEach((potion, idx) => {
            if (this.detectCollisionsPlayerPotion(player, potion)) {
                collidedPotion = idx
                this.life += 200
                let color = this.colorLife
                this.colorLife = "#6af24a"
                this.audioPotion.play()
                setTimeout(() => this.colorLife = color, 1000)


                if (this.life > this.lifeConst) {
                    this.life = this.lifeConst
                }
            }
        })
        if (collidedPotion !== undefined) potionArray.splice(collidedPotion, 1)
    },
    detectCollisionsPlayerPotion(player, potion) {
        if (
            player.posX + player.width + 5 >= potion.posX && //ok player attack right
            player.posX < potion.posX + potion.width && //ok player attack left
            player.posY - 5 < potion.posY + potion.height && //?ok player attack up
            player.posY + player.height > potion.posY //ok player attack down
        ) {
            return true;
        }
    },


    gameOver() {
        this.audioMain.pause()
        this.audioLinkDies.play()


        setTimeout(() => this.audioGameOver.play(), 500)


        this.ctx.drawImage(
            this.gameOverImg,
            this.width / 2 - this.gameOverImg.width / 2 + 20,
            this.height / 2 - this.gameOverImg.height / 2,
            this.gameOverImg.width,
            this.gameOverImg.height,
        )
        setTimeout(() => clearInterval(this.interval), 500)
    },

    youWin() {
        this.audioMain.pause();
        this.audioIntro.play()
        setTimeout(() => clearInterval(this.interval), 500)


        setTimeout(() => {
            this.ctx.drawImage(
                this.youWinImg,
                this.width / 2 - this.youWinImg.width / 4,
                this.height / 2 - this.youWinImg.height / 4,
                this.youWinImg.width / 2,
                this.youWinImg.height / 2)
        }, 1000)





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

        this.ctx.drawImage(this.score.ghostImage, this.score.posX + 180, this.score.posY + 10, 40, 40)
        // this.ctx.fillRect(this.score.posX + 120, this.score.posY + 20, this.counterHits, this.score.height);

        // this.ctx.lineWidth = this.score.height * 0.2;
        // this.ctx.strokeStyle = "#e4ddd3";
        // this.ctx.strokeRect(this.score.posX + 120, this.score.posY + 20, this.pointsToWin, this.score.height);
        this.ctx.fillStyle = "white";
        this.ctx.font = '2em  "Uncial Antiqua"'
        this.ctx.fillText(`GOAL ${this.pointsToWin}`, this.pointsToWin + 300, this.score.posY + 40)



    },








}