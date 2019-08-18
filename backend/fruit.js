const {Weight, Canvas} = require("./constants");
const {generateCoords} = require("./functions");
const Body = require("./body");

function Fruit() {
    this.color = "rgb(200, 0, 100)";
    this.type = "fruit";

    

    this.init = function({bodies}) {
        const [x, y] = generateCoords({
            width: Canvas.WIDTH - 2, 
            height: Canvas.HEIGHT - 2, 
            bodies
        });

        this.x = x + 1;
        this.y = y + 1;

        this.body = new Body({
            x: this.x, 
            y: this.y, 
            width: 1, 
            height: 1, 
            color: this.color, 
            weight: Weight.FRUIT
        });

        return this;
    }
}

module.exports = Fruit;