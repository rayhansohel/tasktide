import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="text-sm font-poppins text-primary tracking-wide">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="min-h-[calc(100vh-344px)]">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
