const {Direction, Weight, Canvas} = require("./constants");
const {generateCoords} = require("./functions");
const Body = require("./body");

function Snake({id}) {
    this.color = "rgb(50, 200, 50)";
    this.type = "snake";
    this.id = id;

    const template = {
        width: 1, height: 1,
        weight: Weight.SNAKE,
        color: this.color
    }

    this.setDirection = function(direction) {
        const currentDirection = this.direction;
        const newDirection = Direction[direction.toUpperCase()];

        const opposites = Direction.areOpposites(newDirection, currentDirection);

        if(!opposites) {
            this.direction = newDirection;
        }
    }

    this.update = function(game) {
        const [x, y] = this.direction;
        this.x += x;
        this.y += y;

        const head = new Body({x: this.x, y: this.y, ...template});

        let grow = false;

        game.bodies.forEach(body => {
            if(body.intersects(head)) {
                if(body.kills(head)) {
                    game.end();
                } else {
                    const fruit = game.fruits.find(fruit => fruit.body === body);
                    if(fruit) {
                        fruit.init(game);
                    }

                    grow = true;
                }
            }
        });

        if(!grow) this.bodies.pop();

        this.bodies.unshift(head);
    };

    this.init = function() {
        this.direction = Direction.UP;

        this.bodies = [
            new Body({x: this.x, y: this.y,     ...template}),
            new Body({x: this.x, y: this.y + 1, ...template}),
            new Body({x: this.x, y: this.y + 2, ...template})
        ];

        const [x, y] = generateCoords({
            width: Canvas.WIDTH - 1, 
            height: Canvas.HEIGHT - 3, 
            bodies: this.bodies
        });

        this.x = x;
        this.y = y;

        return this;
    }
}

module.exports = Snake;