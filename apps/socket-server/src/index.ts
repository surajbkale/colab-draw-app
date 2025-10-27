import { WebSocketServer, WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prismaClient } from "@repo/db/prismaClient";

const wss = new WebSocketServer({ port: 8100 });

interface User {
  userId: Number | null;
  rooms: string[];
  ws: WebSocket;
}

type Message = {
  type: string;
  message: string;
  room: string;
};

let users: User[] = [];

function broadcastMessage(message: any) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

wss.on("connection", (ws: WebSocket, req: Request) => {
  const rawSlug = req?.url?.split("=")[2];
  const slug = rawSlug?.split("%20").join(" ");

  const urlParams = new URLSearchParams(req?.url?.split("?")[1]);
  const token = urlParams.get("userid");
  if (!token) return;
  const userData = jwt.verify(token, "vinodpr") as JwtPayload;

  // let's check if the user aalready joined that particular room or not?

  const existingUser = users.find((user) => user.userId == userData.id);

  if (existingUser) {
    existingUser.ws = ws; // Update WebSocket instance
    if (slug && !existingUser.rooms.includes(slug)) {
      existingUser.rooms.push(slug);
    }
  } else {
    if (!slug) return;
    const user = { userId: userData.id, rooms: [slug], ws: ws };
    users.push(user);
  }

  ws.on("message", async (message: any) => {
    const data = JSON.parse(message.toString());

    //  find the roomid based upon slug in url
    // const room = await prismaClient.room.findFirst({ where: { slug: slug } });
    // if (!room) return;

    // console.log("Room is", room , "slug is", slug);

    //  dump messages in chat tableesss
    // const x = await prismaClient.chat.create({
    //   data: {
    //     message: JSON.stringify(data),
    //     senderid: userData.id,
    //     roomid: room.id,
    //   },
    // });

    if (!slug) return;
    users.forEach((user) => {
      console.log("i also connected user", user.userId);
      if (user.userId !== userData.id && user.rooms.includes(slug)) {
        console.log("Inside", user.userId);
        user.ws.send(JSON.stringify(data));
      }
    });
  });

  ws.on("close", () => {
    const index = users.findIndex((user) => user.userId === userData.id);
    if (index !== -1) {
      users.splice(index, 1);
    }
  });
});
