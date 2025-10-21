import express from "express";

//object for auto operation
const router = express.Router();

import { notRequireLogin } from "../middleware/authForLogSign.js";// it's not nesesseru to sign up

//import handler for signup
import { getSignupPage, postData } from "../controllers/signupHandler.js";
//send html page
router.get("/signup", notRequireLogin, getSignupPage);

//get data form from
router.post("/api/users/signup", notRequireLogin, postData);

export default router;
