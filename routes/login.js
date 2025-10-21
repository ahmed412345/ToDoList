import express from "express";

//make router
const router = express.Router();

import { notRequireLogin } from "../middleware/authForLogSign.js"; // it's not nesesseru to log in

//import handler for login
import { getLoginPage } from "../controllers/loginHandler.js";
router.get("/login", notRequireLogin, getLoginPage);

//import handler for validate user
import { verifyPassEmail } from "../controllers/loginHandler.js";
router.post("/api/users/login", notRequireLogin, verifyPassEmail);
export default router;
