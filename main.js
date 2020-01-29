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
    collisionGhost : false,
    counterHits: 0,




    init() {
        this.canvas = document.getElementById(`canvas`)
        this.ctx = this.canvas.getContext(`2d`)

        this.width = window.innerWidth
        this.height = window.innerHeight

        this.canvas.width = this.width
        this.canvas.height = this.height

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
            this.collisionsGhostPlayer(this.enemiesArray,this.player)
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

    collisionsGhostPlayer(objectArr, object2) {
        objectArr.forEach(object => {
          this.collisionGhost = this.detectCollisions(object,object2)
        })

        console.log(this.collisionGhost)
        // if (this.collisionGhost=true) {
        // this.counterHits+=1
        // // this.collisionGhost=false
        
        // }

    },

    detectCollisions(object1, object2) {
        if (
            object1.posX + object1.width >= object2.posX &&
            object1.posX < object2.posX + object2.width &&
            object1.posY < object2.posY + object2.height &&
            object1.posY + object1.height > object2.posY
        ) {
            this.counterHits+=1
            console.log(this.counterHits)
            return true;
        }
    },

}