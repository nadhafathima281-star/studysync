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

const dueDate = task.dueDate ? new Date(task.dueDate) : null;

const today = new Date();
today.setHours(0,0,0,0);

if (dueDate) {
  dueDate.setHours(0,0,0,0);
}

let dueClass = "";

if (dueDate) {
  if (dueDate < today && dueDate.toDateString() !== today.toDateString()) {
    dueClass = "overdue";
  } 
  else if (dueDate.toDateString() === today.toDateString()) {
    dueClass = "today";
  }
}

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
  <div className={`task-meta ${dueClass}`}>
    <Calendar size={14} />
    <span>
      {new Date(task.dueDate).toLocaleDateString()}
    </span>

    {task.priority && (
      <span className={`priority-badge ${task.priority}`}>
        {task.priority}
      </span>
    )}
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