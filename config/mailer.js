require('dotenv').config();

const nodemailer = require('nodemailer');
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4f4e7b38f9f437",
      pass: "********dd29"
    }
  });
  // Function to send an email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'your-email@gmail.com', // Sender address
        to: to,                       // List of receivers
        subject: subject,             // Subject line
        text: text,                   // Plain text body
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred: ' + error.message);
        }
        console.log('Email sent: ' + info.response);
    });
};

module.exports = { sendEmail };