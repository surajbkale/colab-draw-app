import { useEffect, useState } from "react";

const useSocket = () => {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const wss = new WebSocket("ws://localhost:8100");

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
