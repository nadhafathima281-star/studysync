import { useState } from "react";
import "./task.css";

export default function TaskForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [dueDate, setDueDate] = useState(
    initialData?.dueDate
      ? initialData.dueDate.split("T")[0]
      : ""
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await onSubmit({
        title,
        dueDate,
      });

      setTitle("");
      setDueDate("");
      onCancel?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="date"
        className="task-date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        autoFocus
      />

      <div className="task-form-actions">
        <button
          type="submit"
          className="primary-btn"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : initialData
            ? "Update"
            : "Add"}
        </button>

        {onCancel && (
          <button
            type="button"
            className="secondary-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}