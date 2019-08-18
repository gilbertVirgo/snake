import React from "react";
import {Link} from "react-router-dom";

const Nav = () => (<ul>
    <li>
        <Link to="/">Home</Link>
    </li>
    <li>
        <Link to="/create">Create</Link>
    </li>
    <li>
        <Link to="/join">Join</Link>
    </li>
</ul>)

export default Nav;