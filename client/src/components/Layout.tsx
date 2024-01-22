import { Outlet } from "react-router-dom";
import { Header } from "./shared/Header";
import { Footer } from "./shared/Footer";

const Layout: React.FC = () => {
  return (
    <main className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex-1 overflow-y-scroll">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
