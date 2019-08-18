const FPS = 15;

const Weight = {
    FRUIT: 0,
    SNAKE: 1,
    BOUNDS: 2
};

const Canvas = {
    WIDTH: 64,
    HEIGHT: 48,
    SCALE: 10
};

const Direction = {
    NONE:   [0, 0],
    LEFT:   [-1, 0],
    RIGHT:  [1, 0],
    UP:     [0, -1],
    DOWN:   [0, 1],
    areOpposites: ([ax, ay], [bx, by]) => 
        ((ax * -1) === bx) || ((ay * -1) === by)
};

module.exports = {FPS, Weight, Canvas, Direction};