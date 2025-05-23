import { FaSearch } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import useWsEmitService from "../service/wsEmits";
import { useSelector } from "react-redux";
import type { RootState } from "../providers/redux/store";

export const SideNav = () => {
  const { email } = useSelector((state: RootState) => state.user);
  const { getOnline } = useWsEmitService();
  return (
    <nav>
      <section className="flex justify-between mt-2">
        <h3>GO CHAT</h3>
        <p>{email}</p>
        {/* <img src="#" alt="img" className="rounded-full bg-black" /> */}
      </section>
      <section className="flex items-center">
        <figure className="grow bg-inp-srch flex items-center mt-2 rounded-lg px-2 py-1 gap-4">
          <FaSearch />
          <input type="text" placeholder="Search" className="grow" />
        </figure>
        <button className="grad1 rounded-full size-fit" onClick={getOnline}>
          <TbReload className="icon-md" />
        </button>
      </section>
    </nav>
  );
};

export const ChatNav = () => {
  const { currChat } = useSelector((state: RootState) => state.chat);
  return (
    <nav className="flex items-center border-b-2">
      <h3>{currChat}</h3>
      {/* <img src="#" alt="img" className="rounded-full bg-black" /> */}
    </nav>
  );
};
