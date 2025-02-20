import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";


const DashboardLayout = () => {
  return (
    <div className="text-sm min-h-screen flex flex-col lg:flex-row gap-4">
      <div className="hidden lg:flex py-4 pl-4 h-screen sticky top-0 z-50 w-80">
        <Sidebar />
      </div>

      <div className="flex-grow min-h-screen flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
