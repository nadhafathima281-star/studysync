const mongoose=require('mongoose')

// create a schema for user
const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,//remove extra spaces
        },
        email:{
            type:String,
            required:true,
            unique:true, //no two users can have same email
            lowercase:true, //converts email to lowercase
        },
        password:{
            type:String,
            required:true,
        },
        phone:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            enum:['student','admin'],
            default:'student',
        },
        // email verification status
        isVerified:{
            type:Boolean,
            default:false,
        },
        // otp for forgot password/login
        otp:{
            type:String,
        },
        otpExpires:{
            type:Date
        },
        refreshToken:{
            type:String,
        },
    },
    {
        // automatically adds createdAt and updatedAt
        timestamps:true,
    }
)
module.exports=mongoose.model('User',userSchema)