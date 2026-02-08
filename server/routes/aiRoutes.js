const express = require("express");
const router = express.Router();

// auth
const protect = require("../middleware/authMiddleware");

// file upload
const upload = require("../middleware/uploadMiddleware");

// controller
const {
  askAI,
  explainNote,
  generateQuestions,
  generateFlashcards,
  getChatHistory,
} = require("../controllers/aiController");

/**
 * =========================
 * GENERAL AI CHAT
 * =========================
 * Used by: AIPage (chat assistant)
 */
// get chat history
router.get("/history",protect,getChatHistory);

router.post("/chat",protect,upload.single("file"),askAI);



/**
 * =========================
 * NOTES AI
 * =========================
 * Used inside Notes page later
 */
router.post("/notes/explain",protect,explainNote);

router.post("/notes/questions",protect,generateQuestions);

/**
 * =========================
 * FLASHCARDS AI
 * =========================
 * Used to auto-generate cards
 */
router.post("/flashcards/generate",protect,generateFlashcards);



module.exports = router;