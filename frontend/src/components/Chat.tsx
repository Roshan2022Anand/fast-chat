import InpMsg from "./InpMsg";
import { ChatNav } from "./Nav";
import { RecvMsg, SentMsg } from "./ui/Msg";

const Chat = () => {
  return (
    <section className="grow bg-prime px-2 py-1 flex flex-col">
      <ChatNav />
      <article className="mt-2 grow">
        <RecvMsg />
        <SentMsg />
      </article>
      <InpMsg />
    </section>
  );
};

export default Chat;
