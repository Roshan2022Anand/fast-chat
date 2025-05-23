import { useEffect } from "react";
import type { msg, WsData, wsEvent } from "../utils/Type";
import { useDispatch } from "react-redux";
import { addMsg, setMembers } from "../providers/redux/slices/Chat";

const useWsListenService = (ws: WebSocket | null) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ws) return;

    //to set online members
    const setOnline = (data: WsData) => {
      dispatch(setMembers(data["users"]));
    };

    const setRecvMsg = (data: WsData) => {
      const msg = data["msg"] as string;
      // const from = data["from"];

      const msgObj: msg = {
        msg,
        type: "received",
      };
      dispatch(addMsg(msgObj));
    };

    const wsMsg = (event: MessageEvent) => {
      const ev: wsEvent = JSON.parse(event.data);

      switch (ev.event) {
        case "msg:received":
          setRecvMsg(ev.data);
          break;
        case "isOnline":
          setOnline(ev.data);
          break;
        default:
          console.error("Unknown event type:", ev.event);
      }
    };

    ws.addEventListener("message", wsMsg);
    return () => {
      ws.removeEventListener("message", wsMsg);
    };
  }, [ws, dispatch]);
};

export default useWsListenService;
