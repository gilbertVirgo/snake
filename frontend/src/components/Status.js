import React from "react";
import "../scss/text.scss";

export const Error = ({children}) => children && 
    <p className="status text-danger">{children}</p>

export const Loading = ({children}) =>
    <p>{children || "Loading..."}</p>

export const Empty = ({children}) =>
    <p>{children || "No results"}</p>