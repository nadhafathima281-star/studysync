const mongoose=require("mongoose")

const flashcardSchema=new mongoose.Schema(
    {
        question: {
            type:String,
            required:true,
            trim:true,
        },
        answer:{
            type:String,
            required:true,
            trim:true,
        },
        deck:{  //creates a relationship.each flashcard belongs to one deck
            type:mongoose.Schema.Types.ObjectId,
            ref:"FlashcardDeck",  //tells mongodv which collection it linkd to 
            required:true,
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
    },
    {timestamps:true}
);

module.exports=mongoose.model("Flashcard",flashcardSchema)