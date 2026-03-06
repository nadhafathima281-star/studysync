import { useState, useEffect } from "react";
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

    if (loading) return;
    if (!title.trim()) return;

    setLoading(true);

    try {
      await onSubmit({
        title,
        dueDate
      });

      if (!initialData) {
        setTitle("");
      setDueDate("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  if (initialData) {
    setTitle(initialData.title || "");
    setDueDate(
      initialData.dueDate
        ? initialData.dueDate.split("T")[0]
        : ""
    );
  }
}, [initialData]);

  return (
    <form className="task-form" onSubmit={handleSubmit}>

      {/* Title */}
      <input
        type="text"
        className="task-input"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Date */}
      <input
        type="date"
        className="task-date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />

      {/* Buttons */}
      <div className="task-form-actions">

        {onCancel && (
          <button
            type="button"
            className="secondary-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="primary-btn"
          disabled={loading}
        >
          {loading ? "Saving..." : initialData ? "Update" : "Add"}
        </button>

      </div>

    </form>
  );
}