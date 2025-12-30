import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useNotes } from "../../context/NoteContext";
import { useTasks } from "../../context/TaskContext";
import ThemeToggle from "./ThemeToggle";
import AppIcon from "../../assets/studysync-icon.svg";
import "./navbar.css";

export default function Navbar() {
  const { logout, user } = useAuth();
  const { notes } = useNotes();
  const { tasks } = useTasks();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = [
    ...tasks.map((t) => ({ type: "Task", text: t.title, link: "/tasks" })),
    ...notes.map((n) => ({ type: "Note", text: n.title, link: "/notes" })),
  ].filter((item) =>
    item.text.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* LEFT – Logo */}
      <div className="navbar-left">
        <img src={AppIcon} alt="StudySync" className="brand-icon" />
        <span className="brand-text">StudySync</span>
      </div>

      {/* CENTER – Search */}
      <div className="navbar-search">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search tasks, notes..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        />

        {showSuggestions && query && (
          <div className="search-dropdown">
            {suggestions.length > 0 ? (
              suggestions.map((item, idx) => (
                <div
                  key={idx}
                  className="search-item"
                  onClick={() => navigate(item.link)}
                >
                  <span className="search-type">{item.type}</span>
                  <span className="search-text">{item.text}</span>
                </div>
              ))
            ) : (
              <div className="search-empty">No results found</div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT – Actions */}
      <div className="navbar-right">
        <ThemeToggle />

        <div className="profile-icon">
          <FiUser />
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut />
        </button>
      </div>
    </nav>
  );
}