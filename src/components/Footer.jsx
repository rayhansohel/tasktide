import { LuCopyright } from "react-icons/lu";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Footer = () => {
  return (
    <div className="h-[66px] w-full px-4 bg-base-200 border border-base-300 rounded-box flex justify-between items-center">
      <div className="flex gap-1 items-center justify-center">
        <Link to="/">
          <span className="text-accent">Task</span>
          <span className="text-neutral">Tide</span>
        </Link>
        <span className="opacity-70">
          <LuCopyright />
        </span>
        <span className="opacity-70">{new Date().getFullYear()}</span>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Footer;
