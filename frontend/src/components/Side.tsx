import Contact from "./Contact";
import { SideNav } from "./Nav";

const SideBar = () => {
  return (
    <section className="w-1/3 bg-side px-2 flex flex-col gap-5">
      <SideNav />
      {["roshan", "popup", "sachin"].map((user, index) => (
        <Contact key={index} name={user} />
      ))}
    </section>
  );
};

export default SideBar;
