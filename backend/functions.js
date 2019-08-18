const randomstring = require("randomstring");
const Body = require("./body");

const functions = {
    generateString: () =>
        randomstring.generate({
            length: 10,
            charset: "alphanumeric"
        }),
    generateCoords: ({width, height, bodies}) => {
        const test = new Body({
            x: Math.floor(Math.random() * (width - 2)), 
            y: Math.floor(Math.random() * (height - 2)),
            width: 1,
            height: 1,
            weight: 0
        })        

        bodies.forEach(body => {
            if(test.intersects(body)) {
                functions.generateCoords({width, height, bodies});
                return false;
            } 
        });

        return [test.x, test.y];
    }
}

module.exports = functions;