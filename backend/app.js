// OK... just figure this out using errors from online
// snake-api.gilbertvirgo.com/create

const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const expressStatusMonitor = require('express-status-monitor');

const Game = require("./game");

const port = 4013;

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
app.use(expressStatusMonitor({
    websocket: io,
    port
}));

const games = [];

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

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

server.listen(port, () => console.log(`Started server on port ${port}`));