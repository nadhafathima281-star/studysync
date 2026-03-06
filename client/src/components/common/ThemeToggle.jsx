import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import "./themeToggle.css";

export default function ThemeToggle() {

  const { theme, toggleTheme } = useTheme();

  return (

    <button
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >

      {theme === "light" ? <FiMoon /> : <FiSun />}

    </button>

  );

}