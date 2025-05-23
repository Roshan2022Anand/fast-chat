import type { msg } from "../../utils/Type";

export const ChatMsg = ({ msg }: { msg: msg }) => {
  return (
    <figure
      className={`w-fit px-2 rounded-md my-1 ${
        msg.type == "sent"
          ? " bg-sent-msg ml-auto rounded-tr-none"
          : " grad2 rounded-tl-none"
      }`}
    >
      {msg.msg}
    </figure>
  );
};
