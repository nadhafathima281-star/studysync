const mongoose=require("mongoose")

const aiChatSchema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        // user question/prompt
        prompt:{
            type:String,
            required:true,
            trim:true,
        },
        // ai generated response
        response:{
            type:String,
            required:true,
        },
        // ai model used
        model:{
            type:String,
            default:"gpt",
        },
    },
    {
        timestamps:true,
    }
);
module.exports=mongoose.model("AiChat",aiChatSchema);