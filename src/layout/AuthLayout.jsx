import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="text-sm font-poppins text-primary tracking-wide min-h-screen">
        <Outlet />
    </div>
  );
};

export default AuthLayout;