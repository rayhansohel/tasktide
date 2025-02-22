import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";


const DashboardLayout = () => {
  return (
    <div className="text-sm min-h-screen flex flex-col lg:flex-row gap-4 p-4">
      <div className="hidden lg:flex h-[calc(100vh-32px)] sticky top-4 w-80">
        <Sidebar />
      </div>

      <div className="flex-1 text-sm font-poppins text-primary tracking-wide min-h-[calc(100vh-96px)] flex flex-col gap-4">
      <div className="min-h-[calc(100vh-114px)]">
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
