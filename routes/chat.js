import ex from "express";

import { chatHandler } from "../controllers/chatHandler.js";

const router = ex.Router();

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/chatbot", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/pages/chatbot.html"));
});

router.post("/api/chatbot", chatHandler);

export default router;
