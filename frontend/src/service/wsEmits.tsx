import type { wsEvent } from "../frontend/src/utils/Type";
import { useWsContext } from "../providers/context/socket/config";

const useWsEmitService = () => {
  const { socket } = useWsContext();

  const wsEmit = (data: wsEvent) => {
    console.log("sending data to ws server", data);

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

  return { wsEmit };
};

export default useWsEmitService;
