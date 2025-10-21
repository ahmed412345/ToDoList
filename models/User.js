import mongoose from "mongoose";
import { Value } from "sass";
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verified: Boolean,
    termsAndConditions: {
        type: Boolean,
        required: true,
    },
    cretedAt: {
        type: Number,
        required: true,
    },
    verificationCode: {
        code: Number,
        ageWithSeconds: Number,
    },
});
const User = mongoose.model("User", userSchema);
export default User;
