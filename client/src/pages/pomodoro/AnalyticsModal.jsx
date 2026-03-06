import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import "./analyticsModal.css";

export default function AnalyticsModal({ stats, onClose }) {

  const [tab, setTab] = useState("days");

  const daysData = [
    { name: "Mon", hours: 1 },
    { name: "Tue", hours: 2 },
    { name: "Wed", hours: 1 },
    { name: "Thu", hours: 3 },
    { name: "Fri", hours: 2 }
  ];

  const weeksData = [
    { name: "Week 1", hours: 6 },
    { name: "Week 2", hours: 4 },
    { name: "Week 3", hours: 7 },
    { name: "Week 4", hours: 5 }
  ];

  const monthsData = [
    { name: "Jan", hours: 20 },
    { name: "Feb", hours: 25 },
    { name: "Mar", hours: 18 },
    { name: "Apr", hours: 30 }
  ];

  let chartData = daysData;

  if (tab === "weeks") chartData = weeksData;
  if (tab === "months") chartData = monthsData;

  return (
    <div className="analytics-overlay">

      <div className="analytics-modal">

        {/* HEADER */}

        <div className="analytics-header">

          <h2>Pomodoro Timer Analytics</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        {/* STATS GRID */}

        <div className="analytics-grid">

          <div className="analytics-card">
            <h3>{stats.today}</h3>
            <p>Today</p>
          </div>

          <div className="analytics-card">
            <h3>{stats.week}</h3>
            <p>This week</p>
          </div>

          <div className="analytics-card">
            <h3>{stats.month}</h3>
            <p>This month</p>
          </div>

          <div className="analytics-card">
            <h3>{stats.focusToday}h</h3>
            <p>Pomodoro time today</p>
          </div>

          <div className="analytics-card">
            <h3>{stats.avg}h</h3>
            <p>Average focus/day</p>
          </div>

          <div className="analytics-card">
            <h3>{stats.tasks}</h3>
            <p>Tasks completed today</p>
          </div>

        </div>


        {/* CHART */}

        <div className="analytics-chart">

          <div className="chart-header">

            <h3>Focus Hours</h3>

            <div className="chart-tabs">

              <span
                className={tab === "days" ? "active" : ""}
                onClick={() => setTab("days")}
              >
                Days
              </span>

              <span
                className={tab === "weeks" ? "active" : ""}
                onClick={() => setTab("weeks")}
              >
                Weeks
              </span>

              <span
                className={tab === "months" ? "active" : ""}
                onClick={() => setTab("months")}
              >
                Months
              </span>

            </div>

          </div>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="hours"
                fill="#6366F1"
                radius={[6,6,0,0]}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}