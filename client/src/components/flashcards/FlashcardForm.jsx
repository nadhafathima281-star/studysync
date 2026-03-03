import "./flashcard.css"
import { useState } from "react";
export default function FlashcardForm({
  deckId,
  onSubmit,
  onCancel,
}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    setLoading(true);
    try {
      await onSubmit({
        question,
        answer,
        deckId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flashcard-form" onSubmit={handleSubmit}>
      <label>Question</label>
      <textarea
        className="deck-input"
        rows="3"
        placeholder="Enter question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <label>Answer</label>
      <textarea
        className="deck-input"
        rows="4"
        placeholder="Enter answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
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
          {loading ? "Saving..." : "Save Flashcard"}
        </button>
      </div>
    </form>
  );
}