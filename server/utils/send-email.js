// send-email.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shahrishav7777@gmail.com',
    pass: 'xgtq aclx ddtp lhom',
  }
});

export async function sendEmail(content) {
  const mailOptions = {
    from: 'shahrishav7777@gmail.com',
    to: 'vanillaxxx69xxx@gmail.com,shahrishav7777@gmail.com',
    subject: 'Summary from Gemini',
    text: content
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
}
