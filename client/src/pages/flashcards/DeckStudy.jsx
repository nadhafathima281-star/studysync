import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFlashcards } from "../../context/FlashcardContext";
import FlashcardViewer from "../../components/flashcards/FlashcardViewer";
import StudyControls from "../../components/flashcards/StudyControls";
import FlashcardForm from "../../components/flashcards/FlashcardForm";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";
import "./flashcards.css";

export default function DeckStudy() {
  const { deckId } = useParams();
  const {
    decks,
    cards,
    fetchCardsByDeck,
    createCard,
    loading,
  } = useFlashcards();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [knownCards, setKnownCards] = useState([]);

  // ===========================
  // ACTIVE CARD LOGIC
  // ===========================

  const deck = decks.find((d) => d._id === deckId);

  const activeCards =
    shuffledCards.length > 0 ? shuffledCards : cards;

  const total = activeCards.length;

  const currentCard =
    total > 0 ? activeCards[currentIndex] : null;

  const progress =
    total === 0
      ? 0
      : ((currentIndex + 1) / total) * 100;

  // ===========================
  // FETCH CARDS ON DECK CHANGE
  // ===========================

  useEffect(() => {
    fetchCardsByDeck(deckId);
    setCurrentIndex(0);
    setShuffledCards([]);
    setKnownCards([]);
  }, [deckId]);

  // ===========================
  // SAFETY: FIX INDEX IF TOTAL CHANGES
  // ===========================

  useEffect(() => {
    if (currentIndex >= total && total > 0) {
      setCurrentIndex(total - 1);
    }
  }, [total]);

  // ===========================
  // KEYBOARD NAVIGATION
  // ===========================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, total]);

  // ===========================
  // NAVIGATION
  // ===========================

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // ===========================
  // SHUFFLE
  // ===========================

  const handleShuffle = () => {
    const shuffled = [...cards].sort(
      () => Math.random() - 0.5
    );
    setShuffledCards(shuffled);
    setCurrentIndex(0);
  };

  // ===========================
  // MARK AS KNOWN
  // ===========================

  const handleMarkKnown = () => {
    if (!currentCard) return;

    if (knownCards.includes(currentCard._id)) {
      return;
    }

    setKnownCards((prev) => [
      ...prev,
      currentCard._id,
    ]);

    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // ===========================
  // CREATE CARD
  // ===========================

  const handleCreate = async (data) => {
    await createCard(data);
    setShowModal(false);
  };

  return (
    <div className="deckstudy-page">

      {/* ================= HEADER ================= */}
      <div className="deckstudy-header">
        <div>
          <h1 className="page-title">
            {deck?.title || "Study Deck"}
          </h1>
          <p className="page-subtitle">
            {deck?.description ||
              "Review your flashcards and test your knowledge"}
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Flashcard
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="deckstudy-stats">
        <StatCard
          title="Total Cards"
          value={total}
          subtitle="Flashcards in this deck"
        />
        <StatCard
          title="Progress"
          value={`${Math.round(progress)}%`}
          subtitle="Current session progress"
        />
      </div>

      {/* ================= CONTENT ================= */}

      {loading && <Loader text="Loading flashcards..." />}

      {!loading && total === 0 && (
        <div className="empty-study-card">
          <h3>No flashcards yet</h3>
          <p>Create your first flashcard to start studying.</p>
          <button
            className="primary-btn"
            onClick={() => setShowModal(true)}
          >
            Create First Flashcard
          </button>
        </div>
      )}

      {!loading && total > 0 && (
        <>
          {/* Progress Bar */}
          <div className="progress-container">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="deckstudy-grid">
            {/* LEFT SIDE */}
            <div className="study-left">
              <FlashcardViewer
                card={currentCard}
                currentIndex={currentIndex}
              />

              <StudyControls
                onPrev={handlePrev}
                onNext={handleNext}
                disablePrev={currentIndex === 0}
                disableNext={
                  currentIndex === total - 1
                }
                currentIndex={currentIndex}
                total={total}
              />

              <button
                className="primary-btn mark-known-btn"
                onClick={handleMarkKnown}
                disabled={
                  knownCards.includes(
                    currentCard?._id
                  )
                }
              >
                {knownCards.includes(
                  currentCard?._id
                )
                  ? "Already Known"
                  : "Mark as Known"}
              </button>
            </div>

            {/* RIGHT SIDE */}
            <div className="study-right">
              <div className="flashcard-card">
                <h3>Session Info</h3>

                <p>
                  Card {currentIndex + 1} of {total}
                </p>

                <p>
                  {Math.round(progress)}% completed
                </p>

                <p>
                  Known: {knownCards.length}
                </p>

                <p>
                  Remaining:{" "}
                  {total - knownCards.length}
                </p>

                <button
                  className="secondary-btn restart-btn"
                  onClick={() =>
                    setCurrentIndex(0)
                  }
                >
                  Restart Session
                </button>

                <button
                  className="secondary-btn"
                  onClick={handleShuffle}
                  disabled={total === 0}
                >
                  Shuffle Cards
                </button>
              </div>

              <div className="flashcard-card">
                <h3>Study Tip</h3>
                <p>
                  Read the question carefully and
                  try to answer it in your mind
                  before revealing the solution.
                  Active recall improves retention.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ================= MODAL ================= */}
      {showModal && (
        <Modal
          title="Create New Flashcard"
          onClose={() =>
            setShowModal(false)
          }
        >
          <FlashcardForm
            deckId={deckId}
            onSubmit={handleCreate}
            onCancel={() =>
              setShowModal(false)
            }
          />
        </Modal>
      )}
    </div>
  );
}

function StatCard({ title, value, subtitle }) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <h2>{value}</h2>
      <p>{subtitle}</p>
    </div>
  );
}