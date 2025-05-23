import { IoSend } from "react-icons/io5";

const InpMsg = () => {
  return (
    <figure className="flex h-[70px] my-3.5 gap-2">
      <input
        type="text"
        placeholder="Type a message"
        className="grow bg-inp-msg px-2 "
      />
      <button className="grad1">
        <IoSend className="icon-md" />
      </button>
    </figure>
  );
};

export default InpMsg;
