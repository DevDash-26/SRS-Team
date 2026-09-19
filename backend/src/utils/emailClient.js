const nodemailer = require("nodemailer");

let transporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

// No SMTP configured (e.g. local dev) — log the code so the reset flow still works end to end
const sendPasswordResetEmail = async (to, code) => {
  if (!transporter) {
    console.log(`[email] Password reset code for ${to}: ${code}`);
    return;
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.SMTP_USER,
    to,
    subject: "UCL Campus Hub — Password reset code",
    text: `Your UCL Campus Hub password reset code is ${code}. It expires in 10 minutes. If you didn't request this, you can ignore this email.`,
  });
};

module.exports = { sendPasswordResetEmail };
