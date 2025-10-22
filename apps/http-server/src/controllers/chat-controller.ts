import { prismaClient } from "@repo/db/prismaClient";

export const RoomChats = async (req: any, res: any) => {
  try {
    const roomid = req.query.roomid as string;
    console.log("roomid in roomchats", roomid);
    const response = await prismaClient.chat.findMany({
      where: {
        roomid: Number(roomid),
      },
    });

    res.status(200).json({
      message: "all chats from a room find successfully",
      chats: response,
    });
  } catch (error) {
    res.status(400).json({
      message: "error in finding chats from a room",
      error: error,
    });
  }
};
