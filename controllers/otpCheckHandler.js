import asyncHandler from "./asyncHandler.js";

const getOptPage = asyncHandler((req, res) => {
    res.status(200).render("./pages/activation.ejs");
});

export { getOptPage };

import User from "../models/User.js";
const optCheck = asyncHandler(async (req, res) => {
    const { opt } = req.body;
    const { email } = req.session;
    console.log(email);
    console.log(opt);

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "user has not founded" });
    }
    if (user.verified) {
        return res.status(400).json({ message: "user has already verified" });
    }
    if (user.verificationCode.code != opt) {
        return res.status(400).json({ message: "invalid code" });
    }
    if (user.verificationCode.ageWithSeconds < Date.now()) {
        return res.status(400).json({ message: "code has expeired" });
    }

    //then activate the account
    user.verified = true;
    user.verificationCode = {};
    await user.save();

    res.json({ message: "email verified successfully" });
});

export { optCheck };
