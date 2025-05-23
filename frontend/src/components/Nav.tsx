import { FaSearch } from "react-icons/fa";
export const SideNav = () => {
  return (
    <nav>
      <section className="flex justify-between mt-2">
        <h3>GO CHAT</h3>
        <img src="#" alt="img" className="rounded-full bg-black" />
      </section>
      <section className="bg-inp-srch flex items-center mt-2 rounded-lg px-2 py-1 gap-4">
        <FaSearch />
        <input type="text" placeholder="Search" className="grow" />
      </section>
    </nav>
  );
};

export const ChatNav = () => {
  return (
    <nav className="flex items-center border-b-2">
      <h3>user 1</h3>
      {/* <img src="#" alt="img" className="rounded-full bg-black" /> */}
    </nav>
  );
};
