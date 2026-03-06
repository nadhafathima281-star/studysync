const express=require('express')
const router=express.Router() //create router instance

const upload = require('../middleware/uploadMiddleware') //multer middleware for avatar uploads

// import controllers
const{
    registerUser,
    verifyEmail,
    loginUser,
    sendOtp,
    verifyOtp,
    forgotPassword,
    verifyResetOtp,
    resetPassword,
    refreshAccessToken,
    logoutUser,
}=require('../controllers/authController') 

const { updateAvatar } = require('../controllers/userController') //controller for handling avatar update

// auth middleware
const protect=require('../middleware/authMiddleware')


/* ================= AUTH ROUTES ================= */

// register route
router.post('/register',registerUser)

// email verification route
router.get('/verify-email/:token',verifyEmail)

// login route
router.post('/login',loginUser)

// send otp
router.post('/send-otp',sendOtp)

// verify otp  
router.post('/verify-otp',verifyOtp)


/* ================= PASSWORD RESET ================= */

// forgot-password
router.post('/forgot-password',forgotPassword)

// verify forgot password otp and redirect to reset password
router.post('/verify-reset-otp',verifyResetOtp)

// reset-password
router.post('/reset-password',resetPassword)


/* ================= TOKEN ROUTES ================= */

// refresh access token
router.post('/refresh',refreshAccessToken)

// logout route
router.post('/logout',logoutUser)


/* ================= PROTECTED ROUTES ================= */

// get logged-in user profile
router.get('/profile',protect,(req,res)=>{

    // remove sensitive fields before sending user data
    const {password,refreshToken,otp,resetOtp,...safeUser}=req.user._doc

    res.status(200).json({
        message:'Profile fetched successfully',
        user:safeUser,
    })
})


// get currently logged-in user details
router.get('/me',protect,(req,res)=>{
    res.json({
        user:req.user,
    })
})


// update avatar route for profile picture
router.put('/avatar',protect, updateAvatar)


module.exports=router