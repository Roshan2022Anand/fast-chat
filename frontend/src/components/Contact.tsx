import { useDispatch } from "react-redux";
import { setCurrChat } from "../providers/redux/slices/Chat";

const Contact = ({ email }: { email: string }) => {
  const dispatch = useDispatch();
  return (
    <button
      className="border-b-2 border-prime flex gap-3 py-2"
      onClick={() => {
        dispatch(setCurrChat(email));
      }}
    >
      <img src="#" alt="img" className="rounded-full bg-black size-[30px]" />
      <p className="grow ">{email}</p>
    </button>
  );
};

export default Contact;
