const nodemailer=require('nodemailer')

// console.log("EMAIL_USER =", process.env.EMAIL_USER);
// console.log("EMAIL_PASS =", process.env.EMAIL_PASS ? "LOADED" : "MISSING");


//create reusable transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// verify transporter on server start
transporter.verify((error,success)=>{
    if(error){
        console.error('❌ Email transporter error:',error)
    }else{
        console.log('✅ Email transporter ready')
    }
})

// Email sender 
const sendEmail=async({to,subject,html})=>{
    try{
        const info=await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to,
            subject,
            html,
        })

        console.log('📧 Email sent successfully:',info.messageId)
    }catch(error){
        console.error('❌ Failed to send email:',error.message)
        throw error
    }
}

module.exports=sendEmail