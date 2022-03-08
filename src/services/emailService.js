const nodemailer = require('nodemailer');

const emailConfig = {
  host: 'main.testuser.com',
  port: 587, 
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

// create transporter for mail
const transporter = nodemailer.createTransport(emailConfig);

const triggerEmail = async (emailOpts) => {

console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS); 
  try {
    await transporter.sendMail({
      from: `"Nodemailer" <${process.env.EMAIL_USER}>`,
      to: emailOpts.emailTo,
      subject: emailOpts.subject,
      text: emailOpts.text,
    });
  } catch (error) {
    console.log(error)
     throw error
  }
};

module.exports = { triggerEmail };
