const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  exportUserTasks,
  exportUserNotes,
  exportUserFlashcards,
  exportUserResources
} = require("../controllers/reportController");

router.get("/tasks", protect, exportUserTasks);

router.get("/notes", protect, exportUserNotes);

router.get("/flashcards", protect, exportUserFlashcards);

router.get("/resources", protect, exportUserResources);

module.exports = router;