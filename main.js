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
        while (this.enemiesArray.length <= 3) {
            this.enemiesArray.push(new Enemy(this.ctx, this.width, this.height, framesCounter))
        }
    },

}