export const API_ROOT = (
    window.location.hostname === "localhost" || 
    window.location.hostname === "127.0.0.1" || 
    window.location.hostname === "") ? 
    "http://localhost:4013" : 
    "http://snake-api.gilbertvirgo.com";