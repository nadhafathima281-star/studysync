const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const reportController = require("../controllers/reportController");

// EXPORT REPORTS (USER)
router.get("/tasks", protect, reportController.exportUserTasks);
router.get("/notes", protect, reportController.exportUserNotes);
router.get("/flashcards", protect, reportController.exportUserFlashcards);

module.exports = router;
