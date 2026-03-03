import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "./admin.css";

const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#06B6D4", "#8B5CF6"];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch admin stats");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="admin-loading">Loading...</div>;
  if (!stats) return <div className="admin-loading">No data available</div>;

  const barData = [
    { name: "Users", value: stats.user },
    { name: "Notes", value: stats.notes },
    { name: "Tasks", value: stats.tasks },
    { name: "Decks", value: stats.flashcardDecks },
    { name: "Flashcards", value: stats.flashcards },
    { name: "Resources", value: stats.resources },
  ];

  const pieData = [
    { name: "Notes", value: stats.notes },
    { name: "Tasks", value: stats.tasks },
    { name: "Flashcards", value: stats.flashcards },
    { name: "Resources", value: stats.resources },
  ];

  return (
    <div className="admin-page">

      {/* ===== Header ===== */}
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>System overview & analytics</p>
      </div>

      {/* ===== Stat Cards ===== */}
      <div className="admin-stats-grid">
        <StatCard title="Total Users" value={stats.user} />
        <StatCard title="Notes" value={stats.notes} />
        <StatCard title="Tasks" value={stats.tasks} />
        <StatCard title="Flashcard Decks" value={stats.flashcardDecks} />
        <StatCard title="Flashcards" value={stats.flashcards} />
        <StatCard title="Resources" value={stats.resources} />
      </div>

      {/* ===== Charts Section ===== */}
      <div className="admin-charts-grid">

        {/* Bar Chart */}
        <div className="chart-card">
          <h3>System Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366F1" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="chart-card">
          <h3>Content Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="admin-stat-card">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}