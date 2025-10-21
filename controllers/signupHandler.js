import path from "path";

import { hash } from "bcrypt";
//wrapper function for handling error
import asyncHandler from "./asyncHandler.js";

export const getSignupPage = asyncHandler((req, res) => {
    res.sendFile(path.resolve("public/pages/signup.html"));
});

import User from "../models/User.js";

// function to verify the data
function validateUserData(data) {
    const { firstName, lastName, email, password, termsAndConditions } = data;
    const englishLettersOnly = /^[A-Za-z-]+$/;

    if (!firstName || firstName.trim().length < 3) {
        return { isValid: false, field: "firstName", message: "First name must be at least 3 characters long" };
    }
    if (!englishLettersOnly.test(firstName)) {
        return { isValid: false, field: "firstName", message: "First name must contain English letters only" };
    }

    if (!lastName || lastName.trim().length < 3) {
        return { isValid: false, field: "lastName", message: "Last name must be at least 3 characters long" };
    }
    if (!englishLettersOnly.test(lastName)) {
        return { isValid: false, field: "lastName", message: "Last name must contain English letters only" };
    }

    const emailValue = email?.trim().toLowerCase();
    if (!emailValue || !emailValue.endsWith("@gmail.com")) {
        return { isValid: false, field: "email", message: "Only Gmail addresses are allowed" };
    }

    if (!password || password.length < 8) {
        return { isValid: false, field: "password", message: "Password must be at least 8 characters long" };
    }

    if (!termsAndConditions) {
        return { isValid: false, field: "checkbox", message: "You must agree to the terms & conditions" };
    }

    return { isValid: true };
}

//import mailer lib
import { sendOTP } from "../config/mailer.js";

// add user
export const postData = asyncHandler(async (req, res) => {
    const { isValid, field, message } = validateUserData(req.body);

    if (!isValid) {
        return res.status(400).json({ success: false, field, message });
    }

    const email = req.body.email;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const field = "email";
        return res.status(400).json({ success: false, field, message: "Email already registered" });
    }

    const dbObject = new User(req.body);

    dbObject.password = await hash(dbObject.password, 10);

    dbObject.verified = false;

    dbObject.cretedAt = Date.now();

    const otp = Math.floor(100000 + Math.random() * 900000); // six number
    dbObject.verificationCode = {
        code: otp,
        ageWithSeconds: Date.now() + 10 * 60 * 1000,
    };

    await dbObject.save();
    req.session.email = dbObject.email;

    await sendOTP(dbObject.email, otp);

    res.status(201).json({ success: true, message: "User created successfully" });
});
