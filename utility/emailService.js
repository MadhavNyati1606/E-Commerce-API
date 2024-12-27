const nodemailer = require("nodemailer");
require("dotenv").config();
const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email Sent Successfully");
  } catch (err) {
    console.log("Error sending email: " + err);
    throw err;
  }
};

module.exports = sendEmail;
