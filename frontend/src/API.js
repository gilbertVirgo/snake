import request from "request";

export const API_ROOT = (
    location.hostname === "localhost" || 
    location.hostname === "127.0.0.1" || 
    location.hostname === "") ? 
    "http://localhost:4013" : 
    "http://snake-api.gilbertvirgo.com";

export const Room = {
    create: async roomName => 
        await request.put(API_ROOT + "/room", {name: roomName}),
    join: id => 
        await request.post(API_ROOT + "/room", {id}),
    getAll: () => 
        await request.get(API_ROOT + "/rooms")
}