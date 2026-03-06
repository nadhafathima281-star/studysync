const User = require("../models/User");
const Note = require("../models/Note");
const Task = require("../models/Task");
const FlashcardDeck = require("../models/FlashcardDeck");
const Resource = require("../models/Resource");
const Flashcard = require("../models/Flashcard");

exports.getAdminStats = async (req, res) => {
  try {

    const [
      usersCount,
      notesCount,
      tasksCount,
      decksCount,
      flashcardsCount,
      resourcesCount,
    ] = await Promise.all([
      User.countDocuments(),
      Note.countDocuments(),
      Task.countDocuments(),
      FlashcardDeck.countDocuments(),
      Flashcard.countDocuments(),
      Resource.countDocuments(),
    ]);

    res.status(200).json({
      user: usersCount || 0,
      notes: notesCount || 0,
      tasks: tasksCount || 0,
      flashcardDecks: decksCount || 0,
      flashcards: flashcardsCount || 0,
      resources: resourcesCount || 0,
    });

  } catch (error) {

    console.error("Admin stats error:", error);

    res.status(500).json({
      message: "Failed to fetch admin dashboard statistics",
    });

  }
};

exports.getRecentUsers = async (req, res) => {
    try {

        const users = await User.find()
        .select("name email role createdAt avatar")
        .sort({ createdAt: -1 })
        .limit(5);

        res.status(200).json(users);
    } catch (error) {
        console.error("Recent users error:", error);

        res.status(500).json({
            message: "Failed to fetch recent users"
        });
        
    }
};