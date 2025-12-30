const User=require("../models/User");
const Note=require("../models/Note");
const Task=require("../models/Task");
const flashcard=require("../models/Flashcard");
const FlashcardDeck=require("../models/FlashcardDeck");
const Resource=require("../models/Resource");
const Flashcard = require("../models/Flashcard");

exports.getAdminStats=async(req,res)=>{
    try{
        const [
            usersCount,
            notesCount,
            tasksCount,
            decksCount,
            flashcardsCount,
            resourcesCount,
        ]=await Promise.all([
            User.countDocuments(),
            Note.countDocuments(),
            Task.countDocuments(),
            FlashcardDeck.countDocuments(),
            Flashcard.countDocuments(),
            Resource.countDocuments(),
        ]);

        res.status(200).json({
            user:usersCount,
            notes:notesCount,
            tasks:tasksCount,
            flashcardDecks:decksCount,
            flashcards:flashcardsCount,
            resources:resourcesCount,
        });
    }catch(error){
        console.error("Admin stats error:",error);
        res.status(500).json({
            message:"Failed to fetch admin dashboard statistics",
        });
    }
};