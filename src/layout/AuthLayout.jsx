import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="text-sm font-poppins text-primary tracking-wide min-h-screen p-4">
      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-32px)]">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
