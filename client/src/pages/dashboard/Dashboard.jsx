import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTasks } from "../../context/TaskContext";
import { useNotes } from "../../context/NoteContext";
import "./dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const { tasks } = useTasks();
  const { notes } = useNotes();

  const pendingTasks = tasks.filter(t => t.status !== "completed");
  const recentNotes = notes.slice(0, 3);
  const recentTasks = tasks.slice(0, 3);

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>
          Welcome{user?.name ? `, ${user.name}` : ""} 👋
        </h1>
        <p className="dashboard-subtitle">
          Here’s a quick overview of your study progress.
        </p>
      </div>

      {/* Stats */}
      <div className="dashboard-stats">
        <div className="stat">
          <h3>{tasks.length}</h3>
          <p>Total Tasks</p>
        </div>
        <div className="stat">
          <h3>{pendingTasks.length}</h3>
          <p>Pending Tasks</p>
        </div>
        <div className="stat">
          <h3>{notes.length}</h3>
          <p>Notes</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Recent Tasks */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h3>Recent Tasks</h3>
            <Link to="/tasks">View all</Link>
          </div>

          {recentTasks.length === 0 ? (
            <p className="empty">No tasks yet</p>
          ) : (
            <ul>
              {recentTasks.map(task => (
                <li key={task._id}>{task.title}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Notes */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h3>Recent Notes</h3>
            <Link to="/notes">View all</Link>
          </div>

          {recentNotes.length === 0 ? (
            <p className="empty">No notes yet</p>
          ) : (
            <ul>
              {recentNotes.map(note => (
                <li key={note._id}>{note.title}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-actions">
        <Link to="/tasks" className="action-btn">➕ Add Task</Link>
        <Link to="/notes" className="action-btn">➕ Add Note</Link>
        <Link to="/flashcards" className="action-btn">📚 Flashcards</Link>
        <Link to="/resources" className="action-btn">🔗 Resources</Link>
      </div>
    </div>
  );
}
