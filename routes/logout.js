import e from "express";

const router = e.Router();

import { requireLogin } from "../middleware/auth.js";
import { getLogoutPage } from "../controllers/logoutHandler.js";

router.get("/logout", requireLogin, getLogoutPage);

export default router;
