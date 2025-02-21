import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="text-sm font-poppins text-primary tracking-wide min-h-screen p-4 flex flex-col gap-4">
      <div className="sticky top-4 z-50">
        <Navbar />
      </div>
      <div className="min-h-[calc(100vh-196px)] bg-base-200 border border-base-300 rounded-box">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
