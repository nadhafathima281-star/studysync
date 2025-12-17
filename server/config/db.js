const mongoose=require('mongoose')  //import mongoose

// function to connect to mongodb
const connectDB=async()=>{
    try{
        //connect to mongodb using URI from .env file
        await mongoose.connect(process.env.MONGO_URI)
        // if connection is successful
        console.log('MongoDB connected successfully')
    }catch(error){
        // if connection fails, log the error message
        console.error('MongoDB connection failed:',error.message)
        process.exit(1) //stop the server if database connection fails
    }
}
module.exports=connectDB