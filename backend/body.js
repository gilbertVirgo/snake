function Body({color, x, y, width, height, weight}) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.dx = x + width;
    this.dy = y + height;
    this.width = width;
    this.height = height;
    this.weight = weight;

    this.intersects = function(body) {
        const x = (
            (this.dx > body.x) &&
            (this.x < body.dx)
        );
        const y = (
            (this.dy > body.y) &&
            (this.y < body.dy)
        );

        return x && y;
    }

    this.kills = function(body) {
        return this.weight >= body.weight;
    }
}

module.exports = Body;