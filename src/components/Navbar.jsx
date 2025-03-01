import { Link } from "react-router-dom";
import Logo from "../assets/tasktide-logo.png";
import AuthButton from "./AuthButton";

const Navbar = () => {
  return (
    <div className="bg-base-200 border border-base-300 rounded-box">
      <div className="p-4 flex justify-between items-center">
        {/* Brand Logo */}
        <div className="flex items-center min-w-20 gap-2">
          <Link to="/">
            <div className="flex items-center justify-center gap-1">
              <img src={Logo} alt="Logo" className="w-32" />
            </div>
          </Link>
        </div>

        {/* Auth button */}
        <div className="min-w-20 flex justify-end items-center gap-2">
          <AuthButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
