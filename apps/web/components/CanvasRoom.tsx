"use client";
import Canvas from "./Canvas";
import useSocket from "../app/hooks/useSocket";

const CanvasRoom = (roomid: { roomId: string }) => {
  const { loading, socket } = useSocket();

  if (!socket) return <h1 className="text-black">Loading the content...</h1>;

  return (
    <div>
      <Canvas socket={socket} />
    </div>
  );
};

export default CanvasRoom;
