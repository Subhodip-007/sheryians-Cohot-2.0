import "dotenv/config"
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
});
// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

export const sendMail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.GOOGLE_USER,
            to,
            subject,
            html,
        });
             console.log("Message sent:", info.messageId);

        return info;
    } catch (error) {
         console.error("Error sending email:", error);
        throw error;
    }
};