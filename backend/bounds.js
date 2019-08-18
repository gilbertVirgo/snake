const {Canvas, Weight} = require("./constants");
const Body = require("./body");

const Bounds = function() {
    this.type = "bounds";
    this.bodies = [];

    const template = {
        weight: Weight.BOUNDS
    }

    this.init = function() {
        const {WIDTH, HEIGHT} = Canvas;

        this.bodies = [
            new Body({x: 0, y: 0, width: WIDTH, height: 1, ...template}),
            new Body({x: 0, y: 1, width: 1, height: HEIGHT - 2, ...template}),
            new Body({x: WIDTH - 1, y: 1, width: 1, height: HEIGHT - 2, ...template}),
            new Body({x: 0, y: HEIGHT - 1, width: WIDTH, height: 1, ...template})
        ];

        return this;
    };
}

module.exports = Bounds;