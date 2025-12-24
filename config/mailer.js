import nodemailer from "nodemailer";

import dotenv from "dotenv";
//add variables to environment
dotenv.config();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.gmail,
        pass: process.env.gmailPass,
    },
});

const sendOTP = async (email, otp) => {
    const info = await transporter.sendMail(
        {
            from: `"tickit" <${process.env.gmail}>`,
            to: email,
            subject: "[tickit] please verify your device",
            text: "your otp is " + otp,
            html: `<p>the activation code is </p><b>${otp}</b>`,
        },
        (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info.response);
            }
        }
    );
};

export { sendOTP };
