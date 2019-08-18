import React from "react";
import "../scss/header.scss";

const Header = ({children}) => 
    (<header>
        {children}
        <hr/>
    </header>);

Header.Title = ({children, style}) => <h1 style={style}>{children}</h1>
Header.Subtitle = ({children, style}) => <h4 style={style}>{children}</h4>

export default Header;