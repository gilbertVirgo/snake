import React, {setGlobal, useState} from "reactn";
import {withRouter} from "react-router-dom";
import {generateString} from "../functions";
import Form from "../components/Form";
import Button from "../components/Button";
import {API_ROOT} from "../API";

import "../scss/text.scss";

const Join = ({history}) => {
    const [room, setRoom] = useState("");

    const player = generateString();

    const handleSubmit = async () => {
        const req = await fetch(`${API_ROOT}/game/${room}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST", 
            body: JSON.stringify({player})
        });

        const {success, error} = await req.json();

        if(success) {
            setGlobal({player});
            history.push(`/game/${room}`);
        } else {
            console.error(error);
        }
    }

    return (<Form onSubmit={handleSubmit}>
        <dl>
            <dt>Player ID</dt>
            <dd>{player}</dd>
        </dl>
        <Form.Group>
            <Form.Label>Room ID</Form.Label>
            <Form.Input 
                type="text" 
                placeholder="Enter room ID" 
                value={room}
                onChange={({target: {value}}) => setRoom(value)}/>
        </Form.Group>
        <Form.Group>
            <Button type="submit">Join</Button>
        </Form.Group>
    </Form>)
}

export default withRouter(Join);