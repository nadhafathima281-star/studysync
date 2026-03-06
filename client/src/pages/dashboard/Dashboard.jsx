import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import {
  CheckSquare,
  FileText,
  Layers,
  BookOpen,
  Flame,
  Clock
} from "lucide-react";

import PomodoroWidget from "./PomodoroWidget";

import "./dashboard.css";

export default function Dashboard() {

  const { user } = useAuth();

  const [stats, setStats] = useState({
    tasks: 0,
    notes: 0,
    flashcards: 0,
    resources: 0,
    weeklyMinutes: 0,
    weeklyGoal: 600,
    streak: 5
  });

  useEffect(() => {

    const fetchStats = async () => {
      try {

        const res = await api.get("/dashboard/stats");

        setStats(prev => ({
          ...prev,
          ...res.data
        }));

      } catch (error) {
        console.error("Failed to fetch dashboard stats");
      }
    };

    fetchStats();

  }, []);

  const progressPercent = Math.min(
    (stats.weeklyMinutes / stats.weeklyGoal) * 100,
    100
  );

  return (

    <div className="dashboard-wrapper">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>
          <h1>Welcome back, {user?.name || "Student"} 👋</h1>
          <p>Here’s your study progress for today.</p>
        </div>

      </div>


      {/* STATS GRID */}

      <div className="stats-grid">

        <StatCard
          icon={<CheckSquare size={18} />}
          title="Tasks"
          value={stats.tasks}
        />

        <StatCard
          icon={<FileText size={18} />}
          title="Notes"
          value={stats.notes}
        />

        <StatCard
          icon={<Layers size={18} />}
          title="Flashcards"
          value={stats.flashcards}
        />

        <StatCard
          icon={<BookOpen size={18} />}
          title="Resources"
          value={stats.resources}
        />

      </div>


      {/* MAIN GRID */}

      <div className="dashboard-main">


        {/* LEFT SIDE */}

        <div className="left-section">

          {/* WEEKLY PROGRESS */}

          <div className="card progress-card">

            <div className="card-header">
              <h3>Weekly Progress</h3>
              <span>{Math.round(progressPercent)}%</span>
            </div>

            <p className="card-sub">
              {stats.weeklyMinutes} / {stats.weeklyGoal} mins
            </p>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              />

            </div>

          </div>


          {/* POMODORO WIDGET */}

          <div className="card pomodoro-card">

            <div className="card-header">
              <h3>Focus Time</h3>
              <Clock size={18} />
            </div>

            <PomodoroWidget
              stats={{
                sessionsToday: Math.floor(stats.weeklyMinutes / 25),
                focusMinutes: stats.weeklyMinutes,
                streak: stats.streak
              }}
            />

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="right-section">

          {/* QUICK OVERVIEW */}

          <div className="card overview-card">

            <h3>Quick Overview</h3>

            <div className="overview-item">
              <span>Total Tasks</span>
              <strong>{stats.tasks}</strong>
            </div>

            <div className="overview-item">
              <span>Total Notes</span>
              <strong>{stats.notes}</strong>
            </div>

            <div className="overview-item">
              <span>Total Flashcards</span>
              <strong>{stats.flashcards}</strong>
            </div>

          </div>


          {/* STUDY STREAK */}

          <div className="card streak-card">

            <div className="streak-header">
              <Flame size={18} />
              <span>Study Streak</span>
            </div>

            <h2>{stats.streak} Days</h2>

            <p>
              Keep it going! Consistency builds mastery.
            </p>

          </div>


          {/* STUDY TIP */}

          <div className="card tip-card">

            <h3>Study Tip</h3>

            <p>
              Review notes within 24 hours to improve long-term retention.
            </p>

          </div>

          {/* recent activity */}
          <div className="card activity-card">
            <h3>Recent Activity</h3>
            <ul className="activity-list">
              <li>Created a new note</li>
              <li>Completed a task</li>
              <li>Started focus session</li>
              <li>Added new flashcards</li>
            </ul>
          </div>

        </div>

      </div>

    </div>

  );

}


/* Reusable Stat Card */

function StatCard({ icon, title, value }) {

  return (

    <div className="stat-card">

      <div className="stat-top">
        {icon}
        <span>{title}</span>
      </div>

      <h2>{value}</h2>

    </div>

  );

}