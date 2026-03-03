const Flashcard = require("../models/Flashcard");
const FlashcardDeck = require("../models/FlashcardDeck");
const mongoose = require("mongoose");


// =====================================================
// ================== DECK CONTROLLERS =================
// =====================================================


// CREATE A NEW FLASHCARD DECK
// Route: POST /api/flashcards/decks
exports.createDeck = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Basic validation
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Deck title is required" });
    }

    // Create deck linked to logged-in user
    const deck = await FlashcardDeck.create({
      title,
      description: description || "",
      user: req.user.id, // comes from auth middleware
    });

    res.status(201).json(deck);
  } catch (error) {
    console.error("Create deck error:", error);
    res.status(500).json({ message: "Failed to create deck" });
  }
};


// GET ALL DECKS OF LOGGED-IN USER
// Route: GET /api/flashcards/decks
exports.getDecks = async (req, res) => {
  try {
    const decks = await FlashcardDeck.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(req.user.id) },
      },
      {
        $lookup: {
          from: "flashcards",
          localField: "_id",
          foreignField: "deck",
          as: "cards",
        },
      },
      {
        $addFields: {
          cardCount: { $size: "$cards" },
        },
      },
      {
        $project: {
          cards: 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    res.json(decks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch decks" });
  }
};


// DELETE A DECK + ITS FLASHCARDS
// Route: DELETE /api/flashcards/decks/:id
exports.deleteDeck = async (req, res) => {
  try {
    // Only delete if deck belongs to user
    const deck = await FlashcardDeck.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    // Delete all flashcards inside this deck
    await Flashcard.deleteMany({ deck: deck._id });

    res.json({ message: "Deck and flashcards deleted successfully" });
  } catch (error) {
    console.error("Delete deck error:", error);
    res.status(500).json({ message: "Failed to delete deck" });
  }
};



// =====================================================
// ================= FLASHCARD CONTROLLERS =============
// =====================================================


// CREATE A FLASHCARD
// Route: POST /api/flashcards
exports.createCard = async (req, res) => {
  try {
    const { question, answer, deckId } = req.body;

    // Basic validation
    if (!question || !answer || !deckId) {
      return res.status(400).json({
        message: "Question, answer and deckId are required",
      });
    }

    // Verify that deck belongs to logged-in user
    const deck = await FlashcardDeck.findOne({
      _id: deckId,
      user: req.user.id,
    });

    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    // Create flashcard
    const card = await Flashcard.create({
      question,
      answer,
      deck: deckId,
      user: req.user.id,
    });

    res.status(201).json(card);
  } catch (error) {
    console.error("Create flashcard error:", error);
    res.status(500).json({ message: "Failed to create flashcard" });
  }
};


// GET ALL FLASHCARDS OF A DECK
// Route: GET /api/flashcards/deck/:deckId
exports.getCardsByDeck = async (req, res) => {
  try {
    const deckId = req.params.deckId;

    // Verify deck ownership
    const deck = await FlashcardDeck.findOne({
      _id: deckId,
      user: req.user.id,
    });

    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    // Fetch cards
    const cards = await Flashcard.find({
      deck: deckId,
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(cards);
  } catch (error) {
    console.error("Fetch flashcards error:", error);
    res.status(500).json({ message: "Failed to fetch flashcards" });
  }
};


// UPDATE A FLASHCARD
// Route: PUT /api/flashcards/:id
exports.updateCard = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const card = await Flashcard.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { question, answer },
      { new: true } // IMPORTANT: return updated document
    );

    if (!card) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    res.json(card);
  } catch (error) {
    console.error("Update flashcard error:", error);
    res.status(500).json({ message: "Failed to update flashcard" });
  }
};


// DELETE A FLASHCARD
// Route: DELETE /api/flashcards/:id
exports.deleteCard = async (req, res) => {
  try {
    const card = await Flashcard.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!card) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    res.json({ message: "Flashcard deleted successfully" });
  } catch (error) {
    console.error("Delete flashcard error:", error);
    res.status(500).json({ message: "Failed to delete flashcard" });
  }
};