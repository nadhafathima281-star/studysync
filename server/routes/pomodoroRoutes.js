const express = require("express");
const router = express.Router();

// import controller
const {
    saveSession,
    getStats,
} = require("../controllers/pomodoroController");

// import auth middleware
const protect = require("../middleware/authMiddleware");

// save pomodoro session
// POST /api/pomodoro/session
router.post("/session", protect, saveSession);

// get pomodoro stats
// GET /api/pomodoro/stats
router.get("/stats", protect, getStats);

module.exports = router;