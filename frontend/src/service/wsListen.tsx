import { useEffect } from "react";
import type { wsEvent } from "../utils/Type";

const useWsListenService = (ws: WebSocket | null) => {
  useEffect(() => {
    if (!ws) return;

    const wsMsg = (event: MessageEvent) => {
      const ev: wsEvent = JSON.parse(event.data);

      switch (ev.event) {
        default:
          console.error("Unknown event type:", ev.event);
      }
    };

    ws.addEventListener("message", wsMsg);
    return () => {
      ws.removeEventListener("message", wsMsg);
    };
  }, [ws]);
};

export default useWsListenService;
