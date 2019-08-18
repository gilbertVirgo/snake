export const API_ROOT = (
    location.hostname === "localhost" || 
    location.hostname === "127.0.0.1" || 
    location.hostname === "") ? 
    "http://localhost:4013" : 
    "http://snake-api.gilbertvirgo.com";