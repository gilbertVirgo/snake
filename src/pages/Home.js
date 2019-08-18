import React from "react";
import {withRouter} from "react-router-dom"
import Button from "../components/Button";

const Home = ({history}) => (<>
    <Button onClick={() => history.push("/create")}>Create Room</Button>
    <Button onClick={() => history.push("/join")}>Join Room</Button>
</>);

export default withRouter(Home);