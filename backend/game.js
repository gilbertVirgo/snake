const Snake = require("./snake");
const Fruit = require("./fruit");
const Bounds = require("./bounds");

const {FPS, Canvas} = require("./constants");

function Game({room}) {
    this.room = room; 
    this.running = false;

    this.snakes = [];
    this.fruits = [];
    this.bounds = (new Bounds()).init();

    this.bodies = [];

    this.update = function() {
        if(this.running) {
            let bodies = [];

            this.snakes.forEach(snake => {
                snake.update(this);
                bodies.push(...snake.bodies);
            });

            this.fruits.forEach(fruit => bodies.push(fruit.body));
            
            bodies.push(...this.bounds.bodies);

            this.bodies = bodies;
            
            this.socket.volatile.emit("tick", this.bodies);

            setTimeout(this.update.bind(this), 1000 / FPS);
        }
    };

    this.join = function({io, player}) {
        console.log("Game joined");

        const snake = new Snake({id: player});

        this.snakes.push(snake.init());

        io.on("connection", socket => {
            console.log("New connection");

            this.socket = socket;

            socket.on("load", () => {
                console.log("Client ready");
    
                if(!this.running) {
                    this.start();
                    this.update();
                }
            });
    
            socket.on("move", ({player, direction}) => {
                console.log({player, snakes: this.snakes});

                const snake = this.snakes.find(({id}) => id === player);
                snake.setDirection(direction);
            }); 
        })
    }

    this.reset = function() {
        this.bodies = [];

        this.snakes = this.snakes.map(snake => snake.init());
        this.fruits = [];
    }
    
    this.start = function() {
        console.log("Game started");

        this.socket.emit("start", {
            width: Canvas.WIDTH,
            height: Canvas.HEIGHT,
            scale: Canvas.SCALE
        });

        // Fruits
        const fruit = new Fruit();
        this.fruits.push(fruit.init(this));

        this.bodies.push(fruit.body, ...this.bounds.bodies);
    
        this.running = true;
    }

    this.end = function() {
        console.log("Game ended");

        this.running = false;

        this.socket.emit("end");

        this.reset();
        this.start();
    }

    this.init = function(io) {
        // Set listeners and one-time sets
        
        
        return this;
    };
}

module.exports = Game;