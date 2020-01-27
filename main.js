const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 60,
    framesCounter: 0,
    keys: {
        //Arrow Keys
        TOP:38,
        LEFT: 37,
        RIGHT: 39,
        DOWN: 40,
        ATTACK: 87, //"W" 
    },


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
            this.drawAll();






        }, 1000 / this.FPS);
    },

    reset() {
        this.background = new Background(this.ctx, this.width, this.height)
        
        this.player = new Player(this.ctx,this.width,this.height,this.keys)
    },
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

    drawAll() {
        this.background.draw()
        this.player.draw(this.framesCounter);
        


    }








}