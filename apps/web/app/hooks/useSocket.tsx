import { useEffect, useState } from "react";

const useSocket = () => {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const wss = new WebSocket(
      "ws://localhost:8100?userid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTczNzI3OTY0MH0.b7OiXU41tdC6RSvDBuOKLRfk4u6QcMx0A3WYDoLyCPA"
    );

    wss.onopen = () => {
      console.log("WebSocket connection established");
      setSocket(wss);
      setLoading(false);
    };

    return () => {
      wss.close();
    };
  }, []);

  return { loading, socket };
};

export default useSocket;
