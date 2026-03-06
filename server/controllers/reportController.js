const Task = require("../models/Task");
const Note = require("../models/Note");
const Flashcard = require("../models/Flashcard");
const Resource = require("../models/Resource");

const { generateCSV } = require("../utils/csvGenerator");



/* ================================
   EXPORT USER TASKS
================================ */

exports.exportUserTasks = async (req, res) => {

  try {

    const tasks = await Task.find({ user: req.user.id }).lean();

    const csv = generateCSV(tasks, [
      "_id",
      "title",
      "status",
      "createdAt"
    ]);

    res.header("Content-Type", "text/csv");
    res.attachment("studysync-tasks.csv");

    res.send(csv);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to export tasks"
    });

  }

};



/* ================================
   EXPORT USER NOTES
================================ */

exports.exportUserNotes = async (req, res) => {

  try {

    const notes = await Note.find({ user: req.user.id }).lean();

    const csv = generateCSV(notes, [
      
      "title",
      "subject",
      "content",
      "createdAt"
    ]);

    res.header("Content-Type", "text/csv");
    res.attachment("studysync-notes.csv");

    res.send(csv);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to export notes"
    });

  }

};



/* ================================
   EXPORT USER FLASHCARDS
================================ */

exports.exportUserFlashcards = async (req, res) => {

  try {

    const flashcards = await Flashcard.find({ user: req.user.id }).lean();

    const csv = generateCSV(flashcards, [
      
      "question",
      "answer",
      "createdAt"
    ]);

    res.header("Content-Type", "text/csv");
    res.attachment("studysync-flashcards.csv");

    res.send(csv);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to export flashcards"
    });

  }

};



/* ================================
   EXPORT USER RESOURCES
================================ */

exports.exportUserResources = async (req, res) => {

  try {

    const resources = await Resource.find({ user: req.user.id }).lean();

    const csv = generateCSV(resources, [
      
      "title",
      "type",
      "link",
      "createdAt"
    ]);

    res.header("Content-Type", "text/csv");
    res.attachment("studysync-resources.csv");

    res.send(csv);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to export resources"
    });

  }

};