import React from "react";
import CanvasRoom from "../../../components/CanvasRoom";

const page = async ({ params }: { params: { roomid: string } }) => {
  const { roomid } = await params;
  return (
    <div>
      <CanvasRoom roomId={roomid} />
    </div>
  );
};

export default page;
