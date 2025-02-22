import { Link } from "react-router-dom";
import Logo from "../assets/tasktide-logo.png";
import UserCard from "./UserCard";
import { GoHome } from "react-icons/go";
import { Tooltip } from "react-tooltip";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";
import AddTaskButton from "./AddTaskButton";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="w-96 h-full flex flex-col bg-base-200 rounded-box p-4">
      <div className="flex items-center gap-2 justify-between w-full p-4 bg-base-300 rounded-xl">
        {/* Brand Logo */}
        <div className="flex items-center min-w-20 gap-2">
          <Link to="/">
            <div className="flex items-center justify-center gap-1">
              <img src={Logo} alt="Logo" className="w-32" />
            </div>
          </Link>
        </div>
        {/* Gome Button */}
        <div className="flex gap-2">
          <Link
            to="/"
            data-tooltip-id="home-tooltip"
            data-tooltip-content="Homepage"
            className="w-8 h-8 bg-secondary rounded-md flex items-center justify-center text-accent hover:bg-secondary/70"
          >
            <GoHome className="text-lg hover:text-accent" />
            <Tooltip
              id="home-tooltip"
              place="bottom"
              style={{
                backgroundColor: theme === "light" ? "#151B23" : "#E5E7Eb",
                color: theme === "light" ? "#ffffff" : "#000000",
                padding: "6px 10px",
                borderRadius: "4px",
              }}
            />
          </Link>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-grow mt-4">
        <AddTaskButton />
      </div>

      {/* User info */}
      <div>
        <div className="flex justify-between items-center w-full p-4 bg-base-300 rounded-xl">
          <UserCard />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
