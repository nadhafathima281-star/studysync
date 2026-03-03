import {
  FiGrid,
  FiCheckSquare,
  FiFileText,
  FiLayers,
  FiBook,
  FiMessageSquare,
  FiLogOut,
  FiX,
} from "react-icons/fi";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./sidebar.css";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      {/* Overlay – Mobile Only */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={handleClose}
        />
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Profile */}
        <div className="sidebar-profile">
          <div className="profile-left">
            <div className="avatar">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="profile-text">
              <div className="profile-name">
                {user?.name}
              </div>
              <div className="profile-role">
                Student
              </div>
            </div>
          </div>

          {/* Close button (hidden on desktop via CSS) */}
          <button
            className="sidebar-close"
            onClick={handleClose}
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="sidebar-divider" />

        {/* Links */}
        <div className="sidebar-links">
          <NavLink to="/" end className="sidebar-link" onClick={handleClose}>
            <FiGrid /> Dashboard
          </NavLink>

          <NavLink to="/tasks" className="sidebar-link" onClick={handleClose}>
            <FiCheckSquare /> Tasks
          </NavLink>

          <NavLink to="/notes" className="sidebar-link" onClick={handleClose}>
            <FiFileText /> Notes
          </NavLink>

          <NavLink to="/flashcards" className="sidebar-link" onClick={handleClose}>
            <FiLayers /> Flashcards
          </NavLink>

          <NavLink to="/resources" className="sidebar-link" onClick={handleClose}>
            <FiBook /> Resources
          </NavLink>

          <NavLink to="/ai-chat" className="sidebar-link" onClick={handleClose}>
            <FiMessageSquare /> AI Chat
          </NavLink>
        </div>

        <div className="sidebar-divider" />

        {/* Logout */}
        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FiLogOut /> Log Out
        </button>
      </aside>
    </>
  );
}