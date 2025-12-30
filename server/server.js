const express = require("express");
const cors = require("cors");   //import cors to allow requests from frontend
const dotenv = require("dotenv");   
const connectDB = require("./config/db");   //import mongodb connection function
dotenv.config();   //load environment v'bles into process.env
const cookieParser=require('cookie-parser')
// import routes
const authRoutes=require('./routes/authRoutes')
const taskRoutes=require('./routes/taskRoutes')
const noteRoutes=require('./routes/noteRoutes')
const flashcardRoutes=require('./routes/flashcardRoutes')
const resourceRoutes=require('./routes/resourceRoutes')
const adminRoutes=require('./routes/adminRoutes')
const reportRoutes=require('./routes/reportRoutes')
connectDB(); //  MongoDB connection

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,              // allow cookies
  })
);

app.use(cookieParser())
app.use((req, res, next) => {
  if (
    req.headers["content-type"] === "application/json" &&
    req.headers["content-length"] === "0"
  ) {
    req.body = {};
  }
  next();
});



app.use(express.json());


app.get("/", (req, res) => {
  res.send("StudySync server is running");
});

// auth routes
app.use('/api/auth',authRoutes)

// task routes
app.use('/api/tasks',taskRoutes)

// note routes
app.use('/api/notes',noteRoutes)

// flashcard routes
app.use('/api/flashcards',flashcardRoutes)

// resource routes
app.use('/api/resources',resourceRoutes)

// admin routes
app.use('/api/admin',adminRoutes)

// report routes
app.use('/api/reports',reportRoutes)

// get port no from .env ot use 5000 as default
const PORT = process.env.PORT || 5000;   

// start server 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
