import express from "express";

//make router
const router = express.Router();

//import handler for homepage
import { getTaskPage } from "../controllers/tasksHandler.js";

//import auth for authenticate session if not exist return him to log in
import { requireLogin } from "../middleware/auth.js";

router.get("/tasks", requireLogin, getTaskPage);

import { postTask } from "../controllers/tasksHandler.js";
router.post("/api/tasks", requireLogin, postTask);

import { deleteTask } from "../controllers/tasksHandler.js";
router.delete("/api/tasks", requireLogin, deleteTask);

import { getAllTasks } from "../controllers/tasksHandler.js";
router.get("/api/tasks", requireLogin, getAllTasks);

import { updateTask } from "../controllers/tasksHandler.js";
router.patch("/api/tasks", requireLogin, updateTask);
export default router;
