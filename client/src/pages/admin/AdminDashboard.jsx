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

import {
  FiUsers,
  FiFileText,
  FiCheckSquare,
  FiLayers,
  FiBook,
  FiBox
} from "react-icons/fi";

import "./admin.css";

const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#06B6D4", "#8B5CF6"];

export default function AdminDashboard() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const statsRes = await api.get("/admin/stats");
      const usersRes = await api.get("/admin/recent-users");
      setStats(statsRes.data);
      setRecentUsers(usersRes.data);
    } catch (err) {
      console.error("Failed to fetch admin stats");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="admin-loading">Loading dashboard...</div>;
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

      {/* HEADER */}

      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Analytics overview of StudySync platform</p>
      </div>


      {/* STAT CARDS */}

      <div className="admin-stats-grid">

        <StatCard
          title="Total Users"
          value={stats.user}
          icon={<FiUsers />}
        />

        <StatCard
          title="Notes"
          value={stats.notes}
          icon={<FiFileText />}
        />

        <StatCard
          title="Tasks"
          value={stats.tasks}
          icon={<FiCheckSquare />}
        />

        <StatCard
          title="Flashcard Decks"
          value={stats.flashcardDecks}
          icon={<FiLayers />}
        />

        <StatCard
          title="Flashcards"
          value={stats.flashcards}
          icon={<FiBox />}
        />

        <StatCard
          title="Resources"
          value={stats.resources}
          icon={<FiBook />}
        />

      </div>


      {/* CHARTS */}

      <div className="admin-charts-grid">

        {/* BAR CHART */}

        <div className="chart-card">

          <h3>System Overview</h3>

          <ResponsiveContainer width="100%" height={320}>

            <BarChart data={barData}>

              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="value"
                fill="#6366F1"
                radius={[10,10,0,0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>


        {/* PIE CHART */}

        <div className="chart-card">

          <h3>Content Distribution</h3>

          <ResponsiveContainer width="100%" height={320}>

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={110}
                label
              >

                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip />
              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="admin-users">

        <h3>Recent Users</h3>

        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map(user => (
              <tr key={user._id}>
                <td className="user-cell">
                  <img src={user.avatar} alt="avatar"  className="user-avatar"/>
                  {user.name}
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}


function StatCard({ title, value, icon }) {

  return (

    <div className="admin-stat-card">

      <div className="stat-header">

        <div className="stat-icon">
          {icon}
        </div>

        <span>{title}</span>

      </div>

      <h2>{value}</h2>

    </div>

  );

}