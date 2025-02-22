import { Link } from "react-router-dom";
import Logo from "../assets/tasktide-logo.png";
import AddTaskButton from "./AddTaskButton";
import MobileAuthButton from "./MobileAuthButton";



const MobileNavbar = () => {
  return (
    <div className="bg-base-200 border border-base-300 rounded-box w-full">
      <div className="p-4 flex justify-between items-center">
        {/* Brand Logo */}
        <div className="flex items-center min-w-20 gap-2">
          <Link to="/">
            <div className="flex items-center justify-center gap-1">
              <img src={Logo} alt="Logo" className="w-32" />
            </div>
          </Link>
        </div>

        {/*Mobile Menu*/}
        <div className="flex gap-4 min-w-20">
          <AddTaskButton />
          <MobileAuthButton/>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;