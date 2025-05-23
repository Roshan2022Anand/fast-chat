import { useEffect } from "react";
import Chat from "./components/Chat";
import SideBar from "./components/Side";
import { useSelector } from "react-redux";
import type { RootState } from "./providers/redux/store";
import { useWsContext } from "./providers/context/socket/config";
import type { wsEvent } from "./utils/Type";

const App = () => {
  const { email } = useSelector((state: RootState) => state.user);
  const { currChat } = useSelector((state: RootState) => state.chat);
  const { setSocket } = useWsContext();

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
      const payload: wsEvent = {
        event: "user",
        data: {
          email: email,
        },
      };
      ws.send(JSON.stringify(payload));
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

      if (reconnectTimer) clearTimeout(reconnectTimer);
    };
  }, [setSocket, email]);

  return (
    <main className="flex h-screen">
      <SideBar />
      {currChat ? (
        <Chat />
      ) : (
        <div className="grow bg-prime px-2 py-1 flex justify-center items-center">
          <h3>Chat with your firends</h3>
        </div>
      )}
    </main>
  );
};

export default App;
