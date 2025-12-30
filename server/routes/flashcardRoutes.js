const express=require("express");
const router=express.Router();

// auth middleware - protects routes
const auth=require("../middleware/authMiddleware");

// import flashcard controllers
const flashcardController=require("../controllers/flashcardController");

// DECK ROUTES

// create a new flahscrd deck
router.post("/decks",auth,flashcardController.createDeck);

// get all flashcard decks of a logged-in user
router.get("/decks",auth,flashcardController.getDecks);

// delete a deck and its flashcards
router.delete("/decks/:id",auth,flashcardController.deleteDeck);


// FLASHCARD ROUTES

// create a flashcard inside a deck
router.post("/",auth,flashcardController.createCard);

// get all flashcards of a specific deck
router.get("/deck/:deckId",auth,flashcardController.getCardsByDeck);

// update a flashcard
router.put("/:id",auth,flashcardController.updateCard);

// delete a flashcard
router.delete("/:id",auth,flashcardController.deleteCard);

module.exports=router;