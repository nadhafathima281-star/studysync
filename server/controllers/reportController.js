const Task=require("../models/Task")
const Note=require("../models/Note")
const Flashcard=require("../models/Flashcard")
const{generateCSV}=require("../utils/csvGenerator")

// export user tasks
exports.exportUserTasks=async(req,res)=>{
    try{
        const tasks=await Task.find({user:req.user.id}).lean(); //lean gives raw data without mongodb features

        const csv=generateCSV(tasks,[
            "_id",
            "title",
            "status",
            "createdAt",
        ]);

        res.header("Content-Type","text/csv");
        res.attachment("tasks.csv");
        res.send(csv);
    }catch(error){
        res.status(500).json({message:"Failed to export tasks"});
    }
};

// export user notes
exports.exportUserNotes=async(req,res)=>{
    try{
        const notes=await Note.find({user:req.user.id}).lean();

        const csv=generateCSV(notes,[
            "_id",
            "title",
            "createdAt",
        ]);

        res.header("Content-Type","text/csv");
        res.attachment("notes.csv");
        res.send(csv);
    }catch(error){
        res.status(500).json({message:"Failed to export notes"});
    }
};

// export user flashcards
exports.exportUserFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ user: req.user.id }).lean();

    const csv = generateCSV(flashcards, [
      "_id",
      "question",
      "answer",
      "createdAt",
    ]);

    res.header("Content-Type", "text/csv");
    res.attachment("flashcards.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: "Failed to export flashcards" });
  }
};