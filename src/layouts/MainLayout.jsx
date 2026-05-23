import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const MainLayout = () => {
  return (
    <div>

      <Navbar />

      <div className="min-h-[calc(100vh-200px)]">
        <Outlet />
      </div>

      <Footer />

    </div>
  );
};

export default MainLayout;