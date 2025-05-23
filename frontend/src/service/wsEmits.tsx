import { useWsContext } from "../providers/context/socket/config";
import type { wsEvent } from "../utils/Type";

const useWsEmitService = () => {
  const { socket } = useWsContext();

  //to emit the data to ws server
  const wsEmit = (data: wsEvent) => {
    if (!socket) {
      console.error("WebSocket is null - unable to send message");
      return;
    }

    if (socket.readyState !== WebSocket.OPEN) {
      console.error(`WebSocket is not open (state: ${socket.readyState})`);
      return;
    }

    socket.send(JSON.stringify(data));
  };

  //to send msg
  const sendMsg = (msg: string, to: string) => {
    const payload: wsEvent = {
      event: "msg:sent",
      data: {
        msg,
        to,
      },
    };
    wsEmit(payload);
  };

  const getOnline = () => {
    const payload: wsEvent = {
      event: "online",
      data: {},
    };
    wsEmit(payload);
  };

  return { wsEmit, sendMsg, getOnline };
};

export default useWsEmitService;
