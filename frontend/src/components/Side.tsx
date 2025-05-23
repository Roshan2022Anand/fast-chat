import { useSelector } from "react-redux";
import Contact from "./Contact";
import { SideNav } from "./Nav";
import type { RootState } from "../providers/redux/store";

const SideBar = () => {
  const { members } = useSelector((state: RootState) => state.chat);
  
  return (
    <section className="w-1/3 bg-side px-2 flex flex-col gap-5">
      <SideNav />
      {members.map((email, index) => (
        <Contact key={index} email={email} />
      ))}
    </section>
  );
};

export default SideBar;
