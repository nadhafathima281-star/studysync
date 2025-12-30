import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "1px solid var(--border)",
        background: "var(--surface)",
        color: "var(--text-primary)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.2rem",
        transition: "background 0.25s ease, color 0.25s ease, transform 0.2s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "var(--input-bg)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "var(--surface)")
      }
    >
      {theme === "light" ? <FiMoon /> : <FiSun />}
    </button>
  );
}