import React, {setGlobal} from "reactn";
import {withRouter} from "react-router-dom";
import {generateString} from "../functions";
import Form from "../components/Form";
import Button from "../components/Button";

import "../scss/text.scss";

const Create = ({history}) => {
    const room = generateString();
    const player = generateString();

    const handleSubmit = async () => {
        const endpoint = "http://localhost:8000";

        const req = await fetch(`${endpoint}/game/${room}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT", 
            body: JSON.stringify({player})
        });

        const {success, error} = await req.json();

        if(success) {
            setGlobal({
                player
            });
            history.push(`/game/${room}`);
        } else {
            console.error(error);
        }
    }

    return (<Form onSubmit={handleSubmit}>
        <dl>
            <dt>Player ID</dt>
            <dd>{player}</dd>
            <dt>Room ID</dt>
            <dd>{room}</dd>
        </dl>
        <Form.Group>
            <Button type="submit">Create</Button>
        </Form.Group>
    </Form>)
}

export default withRouter(Create);