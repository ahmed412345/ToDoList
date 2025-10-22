import { Resend } from "resend";

import dotenv from "dotenv";
//add variables to environment

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTP = async (email, otp) => {
    try {
        const info = await resend.emails.send({
            from: "Tickit App <onboarding@resend.dev>",
            to: email,
            subject: "[tickit] please verify your device",
            html: `<p>the activation code is </p><b>${otp}</b>`,
        });
        console.log(info);
    } catch (e) {
        console.log(e);
    }
};

export { sendOTP };
