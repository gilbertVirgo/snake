export const API_ROOT = (
    window.location.hostname === "localhost" || 
    window.location.hostname === "127.0.0.1" || 
    window.location.hostname === "") ? 
    "http://localhost:4013" : 
    "http://172.31.44.74"; // local ip to prevent websocket errors