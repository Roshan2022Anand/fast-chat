import { useSelector } from "react-redux";
import InpMsg from "./InpMsg";
import { ChatNav } from "./Nav";
import { ChatMsg } from "./ui/Msg";
import type { RootState } from "../providers/redux/store";

const Chat = () => {
  const { chat } = useSelector((state: RootState) => state.chat);
  return (
    <section className="grow bg-prime px-2 py-1 flex flex-col">
      <ChatNav />
      <article className="mt-2 grow">
        {chat.map((msg, i) => (
          <ChatMsg msg={msg} key={i} />
        ))}
      </article>
      <InpMsg />
    </section>
  );
};

export default Chat;
