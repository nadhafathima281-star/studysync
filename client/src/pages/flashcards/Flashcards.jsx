import { useEffect, useState } from "react";
import { useFlashcards } from "../../context/FlashcardContext";
import DeckCard from "../../components/flashcards/DeckCard";
import DeckForm from "../../components/flashcards/DeckForm";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import Modal from "../../components/common/Modal";
import { Layers, BookOpen, CalendarDays } from "lucide-react";
import "./flashcards.css";

export default function Flashcards() {
  const { decks, loading, fetchDecks, createDeck } =
    useFlashcards();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchDecks();
  }, []);

  const handleCreate = async (data) => {
    await createDeck(data);
    setShowModal(false);
  };

  // ===== Stats =====
  const totalDecks = decks.length;

  // total cards is sum of all flashcards in all decks
  const totalCards = decks.reduce(
    (sum,deck)=>sum + (deck.cardCount || 0),
    0
  );

  const thisWeek = decks.filter((deck) => {
    const created = new Date(deck.createdAt);
    const now = new Date();
    return now - created < 7 * 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div className="flashcards-page">

      {/* ===== Header ===== */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Flashcards</h1>
          <p className="page-subtitle">
            Create decks, add flashcards, and test your knowledge
          </p>
        </div>
      </div>

      {/* ===== Stats ===== */}
      <div className="flashcard-stats">
        <StatCard
          icon={<Layers size={18} />}
          title="Total Decks"
          value={totalDecks}
          subtitle="Your study collections"
        />

        <StatCard
          icon={<BookOpen size={18} />}
          title="Total Cards"
          value={totalCards}
          subtitle="All flashcards combined"
        />

        <StatCard
          icon={<CalendarDays size={18} />}
          title="This Week"
          value={thisWeek}
          subtitle="New decks created"
        />
      </div>

      {/* ===== Main Grid ===== */}
      <div className="flashcard-grid">

        {/* LEFT SIDE */}
        <div className="flashcard-left">
          <div className="flashcard-card">
            <div className="deck-header">
              <h3>Your Decks</h3>
  
              <button
                className="primary-btn small"
                onClick={() => setShowModal(true)}
              >
                + Create Deck
              </button>
            </div>

            {loading && <Loader text="Loading decks..." />}

            {!loading && decks.length === 0 && (
              <EmptyState
                title="No decks yet"
                description="Create your first flashcard deck to start studying."
              />
            )}

            <div className="deck-list">
              {decks.map((deck) => (
                <DeckCard key={deck._id} deck={deck} />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flashcard-right">

          <div className="flashcard-card side-card">
            <h3>Study Tip</h3>
            <p>
              Review your flashcards within 24 hours to improve
              memory retention.
            </p>
          </div>

          <div className="flashcard-card side-card">
            <h3>How It Works</h3>
            <ul>
              <li>Create a deck</li>
              <li>Add question & answer</li>
              <li>Flip to reveal answer</li>
              <li>Repeat for mastery</li>
            </ul>
          </div>

        </div>
      </div>

      {/* ===== Modal ===== */}
      {showModal && (
        <Modal
          title="Create New Deck"
          onClose={() => setShowModal(false)}
        >
          <DeckForm
            onSubmit={handleCreate}
            onCancel={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        {icon}
        <span>{title}</span>
      </div>
      <h2>{value}</h2>
      <p>{subtitle}</p>
    </div>
  );
}