const mongoose=require("mongoose")

const flashcardDeckSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true,
        },
        description:{
            type:String,
            default:"",
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
    },
    {timestamps:true}
);
module.exports=mongoose.model("FlashcardDeck",flashcardDeckSchema)