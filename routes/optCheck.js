import e from "express";

const router = e.Router();

import { notRequireLogin } from "../middleware/authForLogSign.js";

import { getOptPage } from "../controllers/otpCheckHandler.js";
import { signupFirst } from "../middleware/authForCheckForAc.js";
router.get("/signup/activation", signupFirst, getOptPage);

import { optCheck } from "../controllers/otpCheckHandler.js";

router.post("/api/users/activation", signupFirst, optCheck);

export default router;
