import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8100 })

wss.on("connection", (ws: WebSocket) => {
    console.log(`Socket Connection completed`);
    ws.on("message", (message: any) => {
        console.log(`Listening the message ${message.tostring()}`);
    })
})

console.log(`Listening the messages`)