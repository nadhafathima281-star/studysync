import api from './axios'

// REGISTER USER
export const registerUser=(data)=>{
  // data: {name,emai,phone,password}
  return api.post('/auth/register',data)
}

// LOGIN (Step 1 - generates otp)
export const loginUser=(data)=>{
  // data :{email,password}
  return api.post('/auth/login',data)
}

// SEND / RESEND OTP
export const sendOtp=(data)=>{
  // data : {email, resend (boolean)}
  return api.post('/auth/send-otp',data)
}

// veriyfy OTP (Step 2 - verifies otp and generates jwt token)
export const verifyOtp=(data)=>{
  // data : {email, otp}
  return api.post('/auth/verify-otp',data)
}

//REFRESH ACCESS TOKEN
export const refreshToken=()=>{
  return api.post('/auth/refresh')
}

// LOGOUT
export const logoutUser=()=>{
  return api.post('/auth/logout')
}