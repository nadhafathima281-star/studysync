const Task = require("../models/Task");
const Note = require("../models/Note");
const Flashcard = require("../models/Flashcard");
const Resource = require("../models/Resource");

exports.getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const [tasks, notes, flashcards, resources] = await Promise.all([
      Task.countDocuments({ user: userId }),
      Note.countDocuments({ user: userId }),
      Flashcard.countDocuments({ user: userId }),
      Resource.countDocuments({ user: userId }),
    ]);

    res.status(200).json({
      tasks,
      notes,
      flashcards,
      resources,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};