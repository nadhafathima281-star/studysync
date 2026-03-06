const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const { getAdminStats, getRecentUsers } = require("../controllers/adminController");

router.get("/stats", protect, adminOnly, getAdminStats);

router.get("/recent-users", protect, adminOnly, getRecentUsers);

module.exports = router;