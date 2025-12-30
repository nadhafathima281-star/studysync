import { useEffect, useState } from "react";
import {
  getDecks,
  createDeck,
  getCardsByDeck,
  createCard,
} from "../../api/flashcardApi";

import FlashcardDeck from "../../components/flashcards/FlashcardDeck";
import FlashCard from "../../components/flashcards/FlashCard";

export default function Flashcards() {
  // deck state
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);

  // flashcard state
  const [cards, setCards] = useState([]);

  // create deck form
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");

  // create flashcard form
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // load decks on page load
  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
      const res = await getDecks();
      setDecks(res.data);
    } catch (err) {
      console.error("Failed to fetch decks");
    }
  };

  // create deck
  const handleCreateDeck = async (e) => {
    e.preventDefault();
    if (!deckTitle.trim()) return;

    try {
      await createDeck({
        title: deckTitle,
        description: deckDescription,
      });
      setDeckTitle("");
      setDeckDescription("");
      fetchDecks();
    } catch (err) {
      console.error("Failed to create deck");
    }
  };

  // open deck
  const handleDeckClick = async (deck) => {
    setSelectedDeck(deck);
    try {
      const res = await getCardsByDeck(deck._id);
      setCards(res.data);
    } catch (err) {
      console.error("Failed to fetch cards");
    }
  };

  // create flashcard
  const handleCreateCard = async (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    try {
      await createCard({
        question,
        answer,
        deckId: selectedDeck._id, // ✅ FIXED
      });
      setQuestion("");
      setAnswer("");
      const res = await getCardsByDeck(selectedDeck._id);
      setCards(res.data);
    } catch (err) {
      console.error("Failed to create flashcard");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Flashcards</h1>

      {/* ================= DECK VIEW ================= */}
      {!selectedDeck && (
        <>
          <h2>Create Deck</h2>

          <form onSubmit={handleCreateDeck} style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Deck title"
              value={deckTitle}
              onChange={(e) => setDeckTitle(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Description (optional)"
              value={deckDescription}
              onChange={(e) => setDeckDescription(e.target.value)}
            />
            <br />
            <button type="submit">Create Deck</button>
          </form>

          <h2>Your Decks</h2>
          {decks.length === 0 && <p>No decks yet</p>}

          {decks.map((deck) => (
            <FlashcardDeck
              key={deck._id}
              deck={deck}
              onClick={() => handleDeckClick(deck)}
            />
          ))}
        </>
      )}

      {/* ================= FLASHCARD VIEW ================= */}
      {selectedDeck && (
        <>
          <button onClick={() => setSelectedDeck(null)}>← Back</button>
          <h2>{selectedDeck.title}</h2>

          <h3>Create Flashcard</h3>
          <form onSubmit={handleCreateCard} style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <br />
            <button type="submit">Add Flashcard</button>
          </form>

          {cards.length === 0 && <p>No flashcards yet</p>}

          {cards.map((card) => (
            <FlashCard key={card._id} card={card} />
          ))}
        </>
      )}
    </div>
  );
}
