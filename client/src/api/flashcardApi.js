import api from "./axios";
import axios from "./axios";

// DECK APIs

// get all flashcard decks
export const getDecks=()=>api.get("/flashcards/decks");

// create a new flashcard deck
export const createDeck=(deck)=>api.post("/flashcards/decks",data);

// delete a flashcard deck
export const deleteDeck=(id)=>
    api.delete(`/flashcards/decks/${id}`);

// FLASHCARD APIs

// get all flashcards by deck
export const getCardsByDeck=(deckId)=>
    api.get(`/flashcards/deck/${deckId}`);

// create a flashcard
export const createCard=(data)=>
    api.post("/flashcards",data);

// update a flashcard
export const updateCard=(id,data)=>
    api.put(`/flashcards/${id}`,data);

// delete a flashcard
export const deleteCard=(id)=>
    api.delete(`/flashcards/${id}`);