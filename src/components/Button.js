import React from "react";
import "../scss/button.scss";

const Button = ({children, style, type, onClick}) => <button style={style} type={type} onClick={onClick}>{children}</button>

export default Button;