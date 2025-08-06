import { createTransport } from "nodemailer";
import { Verification_Email_Template } from "./EmailTemplate.js";

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: 'dinesh.chintu199@gmail.com',
        pass: 'rojt qwro pndc lwwn', // Use App Password, don't show in prod!
    },
});

export const SendEmail = async (email, verificationCode) => {
    try {
        const response = await transporter.sendMail({
            from: '"Account Verification" ',
            to: email,
            subject: "Hello ✔",
            text: "Hello world?",
            html: Verification_Email_Template.replace("{verificationCode}", verificationCode),
        });
        console.log("Email sent successfully: " + response.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export { transporter };
