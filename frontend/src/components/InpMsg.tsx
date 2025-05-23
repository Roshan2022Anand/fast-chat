import { useRef } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import type { msg } from "../utils/Type";
import { addMsg } from "../providers/redux/slices/Chat";
import useWsEmitService from "../service/wsEmits";
import type { RootState } from "../providers/redux/store";

const InpMsg = () => {
  const dispatch = useDispatch();
  const msgRef = useRef<HTMLInputElement>(null);
  const { sendMsg } = useWsEmitService();
  const { currChat } = useSelector((state: RootState) => state.chat);

  const handleSend = () => {
    if (!currChat) return;
    const msg = msgRef.current?.value;
    if (msg == null || msg == "") return;

    const msgObj: msg = {
      msg,
      type: "sent",
    };
    dispatch(addMsg(msgObj));
    sendMsg(msg, currChat);
    msgRef.current!.value = "";
  };

  return (
    <figure className="flex h-[70px] my-3.5 gap-2">
      <input
        ref={msgRef}
        type="text"
        placeholder="Type a message"
        className="grow bg-inp-msg px-2 "
      />
      <button className="grad1" onClick={handleSend}>
        <IoSend className="icon-md" />
      </button>
    </figure>
  );
};

export default InpMsg;
