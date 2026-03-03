import "./flashcard.css"
import { useState } from "react";
export default function DeckForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await onSubmit({ title, description });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="deck-form" onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        type="text"
        className="deck-input"
        placeholder="Deck title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Description</label>
      <textarea
        className="deck-input"
        rows="3"
        placeholder="Short description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="form-actions">
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
          {loading ? "Saving..." : "Save Deck"}
        </button>
      </div>
    </form>
  );
}