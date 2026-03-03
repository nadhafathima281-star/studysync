import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const FlashcardContext = createContext();

export const FlashcardProvider = ({ children }) => {
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ===============================
     FETCH ALL DECKS
  ================================= */

  const fetchDecks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/flashcards/decks");
      setDecks(res.data);
    } catch (error) {
      toast.error("Failed to fetch decks");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     AUTO FETCH DECKS ON APP LOAD
  ================================= */

  useEffect(() => {
    if (user) {
    fetchDecks();
    }
  }, [user]);

  /* ===============================
     CREATE DECK
  ================================= */

  const createDeck = async (data) => {
    try {
      const res = await api.post("/flashcards/decks", data);
      setDecks((prev) => [res.data, ...prev]);
      toast.success("Deck created");
    } catch (error) {
      toast.error("Failed to create deck");
    }
  };

  /* ===============================
     DELETE DECK
  ================================= */

  const deleteDeck = async (id) => {
    try {
      await api.delete(`/flashcards/decks/${id}`);
      setDecks((prev) => prev.filter((d) => d._id !== id));
      toast.success("Deck deleted");
    } catch (error) {
      toast.error("Failed to delete deck");
    }
  };

  /* ===============================
     FETCH CARDS BY DECK
  ================================= */

  const fetchCardsByDeck = async (deckId) => {
    setLoading(true);
    try {
      const res = await api.get(`/flashcards/${deckId}`);
      setCards(res.data);
    } catch (error) {
      toast.error("Failed to fetch flashcards");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     CREATE CARD
  ================================= */

  const createCard = async (deckId, data) => {
    try {
      const res = await api.post(`/flashcards/${deckId}`, data);
      setCards((prev) => [res.data, ...prev]);
      toast.success("Flashcard added");
    } catch (error) {
      toast.error("Failed to add flashcard");
    }
  };

  /* ===============================
     DELETE CARD
  ================================= */

  const deleteCard = async (id) => {
    try {
      await api.delete(`/flashcards/${id}`);
      setCards((prev) => prev.filter((c) => c._id !== id));
      toast.success("Flashcard deleted");
    } catch (error) {
      toast.error("Failed to delete flashcard");
    }
  };

  return (
    <FlashcardContext.Provider
      value={{
        decks,
        cards,
        loading,
        fetchDecks,
        createDeck,
        deleteDeck,
        fetchCardsByDeck,
        createCard,
        deleteCard,
      }}
    >
      {children}
    </FlashcardContext.Provider>
  );
};

export const useFlashcards = () => useContext(FlashcardContext);