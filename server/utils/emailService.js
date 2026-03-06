const { Resend } = require('resend');

// check API key
if (!process.env.RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY is missing in environment variables");
}

// create reusable client
const resend = new Resend(process.env.RESEND_API_KEY);

// verify email service on server start
(async () => {
  try {
    console.log("✅ Resend email service ready");
  } catch (error) {
    console.error("❌ Resend initialization error:", error);
  }
})();

// Email sender
const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await resend.emails.send({
      from: "StudySync <onboarding@resend.dev>", // resend default sender
      to,
      subject,
      html
    });

    console.log("📧 Email sent successfully:", info.id);
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
    throw error;
  }
};

module.exports = sendEmail;