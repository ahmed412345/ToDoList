import express from "express";

//make router
const router = express.Router();

//import handler for homepage
import { getHomePage } from "../controllers/homeHandler.js";

router.get("/home", getHomePage);
router.get("/", getHomePage);
export default router;
