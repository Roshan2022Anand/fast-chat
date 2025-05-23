import type React from "react";
import { SocketContext } from "./config";
import { useEffect, useState } from "react";
import useWsListenService from "../../../service/wsListen";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  useWsListenService(socket);

  //to connect to the socket server
  useEffect(() => {
    let ws: WebSocket;
    let reconnectTimer: ReturnType<typeof setTimeout>;
    //to connect ws
    const connectWS = () => {
      ws = new WebSocket("ws://localhost:8080/ws");
      ws.addEventListener("open", wsOpen);
      ws.addEventListener("close", wsClose);
      ws.addEventListener("error", wsError);
    };

    const wsOpen = () => {
      console.log("socket is connected");
      setSocket(ws);
    };

    const wsClose = () => {
      console.log("socket is disconnected");
      ws.close();
      reconnectTimer = setTimeout(connectWS, 4000);
    };

    const wsError = (err: Event) => {
      console.log("socket error", err);
    };

    connectWS();
    //clean up
    return () => {
      ws.removeEventListener("open", wsOpen);
      ws.removeEventListener("close", wsClose);
      ws.removeEventListener("error", wsError);
      ws.close();
      clearTimeout(reconnectTimer);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
