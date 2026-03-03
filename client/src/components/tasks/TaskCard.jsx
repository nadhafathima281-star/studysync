import {
  Trash2,
  Pencil,
  CheckCircle,
  Circle,
  Calendar,
} from "lucide-react";
import "./task.css";

export default function TaskCard({ task, onDelete, onEdit, onToggle }) {
  const isCompleted = task.status === "completed";

  return (
    <div className={`task-card ${isCompleted ? "completed" : ""}`}>
      <div className="task-left">
        <button
          className={`task-check ${isCompleted ? "checked" : ""}`}
          onClick={() => onToggle(task)}
        >
          {isCompleted ? (
            <CheckCircle size={20} />
          ) : (
            <Circle size={20} />
          )}
        </button>

        <div className="task-content">
          <h4 className={`task-title ${isCompleted ? "done" : ""}`}>
            {task.title}
          </h4>

          {task.dueDate && (
            <div className="task-meta">
              <Calendar size={14} />
              <span>
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          className="icon-btn"
          onClick={() => onEdit(task)}
        >
          <Pencil size={16} />
        </button>

        <button
          className="icon-btn delete"
          onClick={() => onDelete(task._id)}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}