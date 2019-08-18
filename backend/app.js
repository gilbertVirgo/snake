const express = require("express");
var bodyParser = require('body-parser')
var cors = require('cors');

const Game = require("./game");

const port = 4013;

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

const server = require("http").Server(app);
const io = require("socket.io")(server);
server.listen(port, () => console.log(`Started server on port ${port}`));

const games = [];

app.post("/game/:room", ({body: {player}, params: {room}}, res) => {
    const response = {success: null, error: null};

    const game = games.find(game => game.room === room)

    if(game) {
        game.join({io: io.of("/" + room), player});

        response.success = true;
    } else {
        response.success = false;
        response.error = "Room of that ID doesn't exist";
    }

    res.json(response);
})

app.put("/game/:room", ({body: {player}, params: {room}}, res) => {
    const response = {success: null, error: null};

    if(!games.find(game => game.room === room)) {
        const game = new Game({room});

        game.join({io: io.of("/" + room), player});

        games.push(game);

        response.success = true;
    } else {
        response.success = false;
        response.error = "Room of that ID already exists";
    }

    res.json(response);
});