import request from "request";

const API_ROOT = "http://localhost:8000";

export const Room = {
    create: async roomName => 
        await request.put(API_ROOT + "/room", {name: roomName}),
    join: id => 
        await request.post(API_ROOT + "/room", {id}),
    getAll: () => 
        await request.get(API_ROOT + "/rooms")
}