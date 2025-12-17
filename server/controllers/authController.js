const User=require('../models/User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const sendEmail=require('../utils/sendEmail')
// const twilio=require('twilio')



// regex validation
const emailRegex = /^\S+@\S+\.\S+$/;
const phoneRegex = /^\+?[1-9]\d{9,14}$/; // E.164 compatible
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

// REGISTER USER
const registerUser=async(req,res)=>{
    try{
        const{name,email,phone,password}=req.body

        // basic validation
        if(!name || !email || !phone || !password){
            return res.status(400).json({message:'Name, email, phone and password are required'})
        }

            // format validation
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: "Invalid phone number" });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
            message:
          "Password must be at least 6 characters and contain at least one letter and one number",
        });
    }

        const emailLower=email.toLowerCase()

        // check existing user
        const existingUser=await User.findOne({email:emailLower})
        if(existingUser){
            return res.status(400).json({message:'User already exists'})
        }

        // hash password
        const hashedPassword=await bcrypt.hash(password,10)

        // create user
        const user=await User.create({
            name,
            email:emailLower,
            phone,
            password:hashedPassword,
            isVerified:false,
        })

        // create email verification token
        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )

        // verification link
         const verificationLink = `http://localhost:${process.env.PORT}/api/auth/verify-email/${token}`;

        // send verification email
        await sendEmail({
            to: emailLower,
            subject: "Verify your StudySync account",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #4F46E5;">StudySync Email Verification</h2>
                <p>Hello ${name},</p>
                <p>Please click the button below to verify your email address:</p>

                <a href="${verificationLink}"
                style="
                display: inline-block;
                padding: 12px 20px;
                margin: 20px 0;
                background-color: #4F46E5;
                color: #ffffff;
                text-decoration: none;
                border-radius: 6px;
                font-weight: bold;
                ">
                Verify Email
                </a>

                <p>This link will expire in <strong>1 hour</strong>.</p>
                <p>If you didn’t create a StudySync account, you can safely ignore this email.</p>

                <hr />
                <p style="font-size: 12px; color: #666;">
                StudySync • AI-Powered Personal Study Assistant
                </p>
                </div>
             `,
        });


        res.status(201).json({message:'Registration successful. Please check your email to verify.'
        })
    }catch(error){
        res.status(500).json({ message: "Server error" })
    }
}

// VERIFY EMAIL 
const verifyEmail=async(req,res)=>{
    try{
        const{token}=req.params

        // verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        const user=await User.findById(decoded.id)
        if(!user){
            return res.status(400).send('Invalid verification link')
        }

        if(user.isVerified){
            return res.status(400).send('Email already verified')
        }

        user.isVerified=true
        await user.save()

        // redirect to frontend
return res.send(`
  <html>
    <head>
      <title>Email Verified</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f9fafb;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .card {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          text-align: center;
        }
        h2 {
          color: #22c55e;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h2>✅ Email Verified Successfully</h2>
        <p>Your StudySync account has been activated.</p>
        <p>You can now close this tab and log in.</p>
      </div>
    </body>
  </html>
`);
    }catch(error){
        return res.status(400).send('Invalid or expired verification link')
    }
}


// LOGIN USER

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body

        // basic validation
        if(!email || !password){
            return res.status(400).json({message:'Email and password are required'})
        }

        if(!emailRegex.test(email)){
            return res.status(400).json({message:'Invalid email format'})
        }

        const emailLower=email.toLowerCase()

        // find user
        const user=await User.findOne({email:emailLower})
        if(!user){
            return res.status(400).json({message:'Invalid credentials'})
        }

        // check email verification
        if(!user.isVerified){
            return res.status(403).json({message:'Please verify your email first'})
        }

        // compare password
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:'Invalid credentials'})
        }

        // generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random()* 900000).toString()

        user.otp=otp
        user.otpExpires=Date.now() + 5 * 60 * 1000 //5 minutes
        await user.save()

        res.status(200).json({
            message:'OTP required',
        })

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

// send OTP (email)
const sendOtp=async(req,res)=>{
    try{
        const{email}=req.body

        if(!email){
            return res.status(400).json({message:'Email is required'})
        }

        const user=await User.findOne({email:email.toLowerCase()})

        if(!user || !user.otp || user.otpExpires < Date.now()){
            return res.status(400).json({message:'OTP expired. Please login again.'})
        }

        // SEND OTP VIA EMAIL
            await sendEmail({
                to:user.email,
                subject:'Studysync Login OTP',
                html:
                `<h3>Your Login OTP</h3>
                <h2 style="letter-spacing:4px;">${user.otp}</h2>
                <p>Valid for 5 minutes.</p>
                `,
            })
        
        res.json({message:'OTP sent to your email'})
    }catch(error){
        console.error(error)
        res.status(500).json({message:'Server error'})
    }
}

// VERIFY OTP
const verifyOtp=async(req,res)=>{
    try{
        const{email,otp}=req.body

        if(!email || !otp){
            return res.status(400).json({message:'Email and OTP are required'})
        }

        const user=await User.findOne({email:email.toLowerCase()})

        if(!user){
            return res.status(400).json({message:'User not found'})
        }

        if(!user.otp || user.otpExpires < Date.now()){
            return res.status(400).json({message:'OTP expired. Please login again.'})
        }

        if(user.otp !== otp){
            return res.status(400).json({message:'Invalid OTP'})
        }

        // otp verified → clear it
        user.otp=undefined
        user.otpExpires=undefined

        // create tokens
        const accessToken=jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        )

        const refreshToken=jwt.sign(
            {id:user._id},
            process.env.JWT_REFRESH_SECRET,
            {expiresIn:'7d'}
        )

        // save refresh token in db
        user.refreshToken=refreshToken
        await user.save()

        // send refresh token as httpOnly cookie
        res.cookie('refreshToken',refreshToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        res.status(200).json({
            message:'Login successful',
            accessToken,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            }
        })

    }catch(error){
        res.status(500).json({message:'Server error'})
    }
}


// REFRESH ACCESS TOKEN
const refreshAccessToken=async(req,res)=>{
    try{
        const refreshToken=req.cookies.refreshToken

        // check if cookie exists
        if(!refreshToken){
            return res.status(401).json({message:'No refresh token provided'})
        }

        // verify refresh token
        const decoded=jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        )

        // find user & match token
        const user=await User.findById(decoded.id)

        if(!user || user.refreshToken !== refreshToken){
            return res.status(401).json({message:'Invalid refresh token'})
        }

        // create new access token
        const newAccessToken=jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:'15m'}
        )

        // send new access token
        res.status(200).json({
            accessToken:newAccessToken,
        })
    }catch(error){
        res.status(401).json({message:'Refresh token expired or invalid'})
    }
}

// LOGOUT USER
const logoutUser=async(req,res)=>{
    try{
        const refreshToken=req.cookies.refreshToken

        if(refreshToken){
            const user=await User.findOne({refreshToken})

            if(user){
                user.refreshToken=undefined
                await user.save()
            }
        }

        // clear cookie
        res.clearCookie('refreshToken',{
            httpOnly:true,
            sameSite:'strict',
            secure:process.env.NODE_ENV ==='production',
        })

        res.status(200).json({message:'Logged out successfully'})
    }catch(error){
        res.status(500).json({message:'Logout failed'})
    }
}

module.exports={
    registerUser,
    verifyEmail,
    loginUser,
    sendOtp,
    verifyOtp,
    refreshAccessToken,
    logoutUser
}