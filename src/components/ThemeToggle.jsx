import { Tooltip } from "react-tooltip";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { HiMoon, HiSun } from "react-icons/hi";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center">
      <button
        className="w-8 h-8 border border-base-300 bg-base-300 rounded-md flex items-center justify-center"
        data-tooltip-id="tooltip"
        data-tooltip-content={`${theme === "dark" ? "Light" : "Dark"}`}
        onClick={handleThemeChange}
      >
        {theme === "dark" ? (
          <HiSun className="text-lg text-accent" />
        ) : (
          <HiMoon className="text-lg text-accent" />
        )}
      </button>
      <Tooltip
        id="tooltip"
        place="bottom"
        style={{
          backgroundColor: theme === "light" ? "#151B23" : "#E5E7Eb",
          color: theme === "light" ? "#ffffff" : "#000000",
          padding: "6px 10px",
          borderRadius: "4px",
        }}
      />
    </div>
  );
};

export default ThemeToggle;
