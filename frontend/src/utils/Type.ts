type WsVal = string | number | string[];

export type WsData = Record<string, WsVal>;

export type wsEvent = {
  event: string;
  data: WsData;
};

export type msg = {
  msg: string;
  type: "sent" | "received";
};
