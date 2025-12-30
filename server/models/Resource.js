const mongoose=require("mongoose")

const resourceSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true,
        },
        link:{
            type:String,
            required:true,
        },
        type:{
            type:String,
            enum:["video","article","pdf","course","other"],
            default:"other",
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User", //foreign key of user model
            required:true,
        },
    },
    {timestamps:true}
)
module.exports=mongoose.model("Resource",resourceSchema)