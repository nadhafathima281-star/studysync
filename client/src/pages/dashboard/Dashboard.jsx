import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Welcome{user?.name ? `, ${user.name}` : ""} 👋
        </h1>
        <p className="dashboard-subtitle">
          Your personal study assistant — stay organised and focused.
        </p>
      </div>

      {/* Main cards */}
      <div className="dashboard-cards">
        <Link to="/tasks" className="dashboard-card">
          <div className="card-icon">📋</div>
          <h3 className="card-title">Tasks</h3>
          <p className="card-desc">
            Plan your day and track progress.
          </p>
        </Link>

        <Link to="/notes" className="dashboard-card">
          <div className="card-icon">📝</div>
          <h3 className="card-title">Notes</h3>
          <p className="card-desc">
            Write and organise study notes.
          </p>
        </Link>

        <Link to="/ai" className="dashboard-card disabled">
          <div className="card-icon">🤖</div>
          <h3 className="card-title">AI Tools</h3>
          <p className="card-desc">
            Smart summaries & quizzes (coming soon)
          </p>
        </Link>
      </div>
    </div>
  );
}