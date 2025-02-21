import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const DashboardLayout = () => {
  return (
    <div className="text-sm min-h-screen flex flex-col lg:flex-row gap-4 p-4">
      <div className="hidden lg:flex min-h-[calc(100vh-96px)] sticky top-0 w-80">
        <Sidebar />
      </div>

      <div className="flex-1 text-sm font-poppins text-primary tracking-wide min-h-[calc(100vh-96px)] flex flex-col gap-4">
      <div className="sticky top-4">
        <Navbar />
      </div>
      <div className="min-h-[calc(100vh-196px)]">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
