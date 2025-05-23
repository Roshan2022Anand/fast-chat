import Chat from "./components/Chat";
import SideBar from "./components/Side";

const App = () => {
  return (
    <main className="flex h-screen">
      <SideBar />
      <Chat />
    </main>
  );
};

export default App;
