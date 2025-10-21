import { compare } from "bcrypt";
import asyncHandler from "./asyncHandler.js";
import User from "../models/User.js";

// 📄 render login page
const getLoginPage = asyncHandler((req, res) => {
    res.status(200).render("./pages/login.ejs");
});
export { getLoginPage };

// 🧩 validate user input before checking DB
function validateUserData(data) {
    const { email, password } = data;

    const emailValue = email?.trim().toLowerCase();
    if (!emailValue || !emailValue.endsWith("@gmail.com")) {
        return { isValid: false, field: "email", message: "Only Gmail addresses are allowed" };
    }

    if (!password || password.length < 8) {
        return { isValid: false, field: "password", message: "Password must be at least 8 characters long" };
    }

    return { isValid: true };
}

// 🧠 verify user credentials and create session
export const verifyPassEmail = asyncHandler(async (req, res) => {
    const { isValid, field, message } = validateUserData(req.body);

    if (!isValid) {
        return res.status(400).json({ success: false, field, message });
    }

    const { email, password } = req.body;

    // 🔍 find user by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.status(400).json({ success: false, field: "email", message: "You don't have an account" });
    }
    if (!existingUser.verified) {
        return res.status(400).json({
            success: false,
            message: "this email is not verified",
        });
    }
    // 🧩 check password
    const isPasswordCorrect = await compare(password, existingUser.password);

    if (isPasswordCorrect) {
        // ✅ store user info in session
        req.session.user = {
            id: existingUser._id,
            email: existingUser.email,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
        };

        // return success response
        res.status(200).json({ success: true, message: "Login successful", Id: existingUser._id });
    } else {
        res.status(401).json({ success: false, field: "password", message: "Incorrect password" });
    }
});
