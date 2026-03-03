import { Trash2, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./flashcard.css";

export default function DeckCard({ deck, onDelete }) {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/flashcards/${deck._id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // prevent card click
    onDelete(deck._id);
  };

  const formattedDate = new Date(deck.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div className="deck-card card-base" onClick={handleOpen}>
      
      {/* Top Section */}
      <div className="deck-top">
        <div className="deck-icon">
          <Layers size={18} />
        </div>

        <div className="deck-info">
          <h3 className="deck-title">{deck.title}</h3>
          <p className="deck-description">
            {deck.description || "No description provided"}
          </p>
        </div>

        <button
          className="deck-delete"
          onClick={handleDelete}
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Bottom Meta Section */}
      <div className="deck-meta">
        <span className="deck-count">
          {deck.cardCount || 0} cards
        </span>
        <span className="deck-date">
          {formattedDate}
        </span>
      </div>

    </div>
  );
}