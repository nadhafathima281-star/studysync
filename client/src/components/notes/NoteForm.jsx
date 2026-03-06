import { useState } from "react";
import "./note.css";

export default function NoteForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [subject, setSubject] = useState(initialData?.subject || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !subject || !content) return;

    setLoading(true);
    try {
      await onSubmit({ title, subject, content });
      onCancel?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
  <div className="form-group">
    <label>Title</label>
    <input
      type="text"
      className="note-input"
      placeholder="Note title..."
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  </div>

  <div className="form-group">
    <label>Subject</label>
    <input
      type="text"
      className="note-input"
      placeholder="e.g. Math, History, Science..."
      value={subject}
      onChange={(e) => setSubject(e.target.value)}
    />
  </div>

  <div className="form-group">
    <label>Content</label>
    <textarea
      className="note-textarea"
      placeholder="Write your notes here..."
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  </div>

  <div className="note-form-actions">
    <button type="button" className="secondary-btn" onClick={onCancel}>
      Cancel
    </button>

    <button type="submit" className="primary-btn">
    {loading ? "Saving..." : initialData ? "Update" : "Save"}
    </button>
  </div>
</form>
  );
}