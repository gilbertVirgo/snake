import React, {useState, useRef, useEffect, useGlobal} from "reactn";
import {withRouter} from "react-router-dom";
import {Error, Loading} from "../components/Status";
import openSocket from 'socket.io-client';
import $ from "jquery";

import "../scss/canvas.scss";

CanvasRenderingContext2D.prototype.drawBody = function({x, y, width, height, color}, scale) {
    this.save();
    this.fillStyle = color;
    this.fillRect(
        x * scale, 
        y * scale, 
        width * scale, 
        height * scale
    );
    this.restore();
}

const handleInput = ({socket, player, canvas}) => {
    const handleMove = options => {
        socket.emit("move", options);
    }

    function Point({x, y}) {
        this.x = x;
        this.y = y;
        this.inTriangle = ([[x1, y1], [x2, y2], [x3, y3]]) => {
            const area = Math.abs(
                (
                    x1 * 
                    (y2 - y3) + 
                    x2 * 
                    (y3 - y1) +  
                    x3 * 
                    (y1 - y2)
                ) 
            / 2.0) ;
            
            const abc = area(x1, y1, x2, y2, x3, y3); 
            const pbc = area(this.x, this.y, x2, y2, x3, y3); 
            const pac = area(x1, y1, this.x, this.y, x3, y3); 
            const pab = area(x1, y1, x2, y2, this.x, this.y); 
    
            /* Check if sum of A1, A2 and A3 is same as A */
            return (abc == pbc + pac + pab); 
        }
    }

    const actions = ["left", "up", "right", "down"]

    $(window).on("keydown", ({which}) => {
        const key = which - 37;

        handleMove({
            direction: actions[key],
            player
        })
    });

    $(canvas).on("touchstart", ({touches}) => {
        const {width, height} = canvas;
        const {clientX: x, clientY: y} = touches[0];

        const point = new Point({x, y});

        const center = [width / 2, height / 2];
        const triangles = [
            [
                [0, 0], 
                center,
                [0, height]
            ], [
                [0, 0],
                center,
                [width, 0]
            ], [
                [width, 0],
                center,
                [width, height]
            ], [
                [0, height],
                center,
                [width, height]
            ]
        ];
    
        let index;
        for(index in triangles) {
            if(point.inTriangle(triangles[index])) break;
        }
        
        handleMove({
            direction: actions[index],
            player
        })
    });
}

const handleCanvasLoad = ({width, height, scale, canvas, socket}) => {
    handleInput({canvas, socket});

    const context = canvas.getContext("2d");
    
    const render = bodies => {
        context.clearRect(0, 0, width * scale, height * scale);
        bodies.forEach(body => context.drawBody(body, scale));
    }

    socket.on("tick", bodies => render(bodies));
}

const Game = ({history, match: {params: {room}}}) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [scale, setScale] = useState(0);

    const [global] = useGlobal();

    const endpoint = "http://localhost:8000";

    const socket = openSocket(`${endpoint}/${room}`);
    const canvas = useRef(null);

    useEffect(() => {
        socket.emit("load");

        socket.on("start", ({width, height, scale}) => {
            console.log("Game started");

            setWidth(width);
            setHeight(height);
            setScale(scale);
            setLoaded(true);
        });

        socket.on("end", () => {
            console.log("Game stopped");

            setWidth(0);
            setHeight(0);
            setScale(0);

            // Don't reset `loaded`
        });
    }, []);

    useEffect(() => {
        if(loaded) { 
            handleCanvasLoad({
                width, height, scale,
                canvas: canvas.current, 
                socket
            });
            handleInput({
                socket,
                player: global.player,
                canvas: canvas.current
            });
        }
    }, [loaded]);

    return <>
        <Error>{error}</Error>
        {loaded ? <canvas ref={canvas} width={width * scale} height={height * scale}/> : <Loading/>}
    </>
}

export default withRouter(Game);