const express=require('express')
const router=express.Router() //create router instance

// import controllers
const{
    registerUser,
    verifyEmail,
    loginUser,
    sendOtp,
    verifyOtp,
    refreshAccessToken,
    logoutUser,
}=require('../controllers/authController') 

// auth middleware
const protect=require('../middleware/authMiddleware')

// register route
router.post('/register',registerUser)

// email verification route
router.get('/verify-email/:token',verifyEmail)

// login route
router.post('/login',loginUser)

// send otp
router.post('/send-otp',sendOtp)

//verify otp  
router.post('/verify-otp',verifyOtp)

// refresh access token
router.post('/refresh',refreshAccessToken)

// logout route
router.post('/logout',logoutUser)

// PROTECTED ROUTES

// get logged-in user profile
router.get('/profile',protect,(req,res)=>{
    res.status(200).json({message:'Profile fetched successfully',
        user:req.user,
    })
})

// get currently logged-in user details
router.get('/me',protect,(req,res)=>{
    res.json({
        user:req.user,
    })
})

module.exports=router 