//wrapper function for handling error
import asyncHandler from "./asyncHandler.js";

const getTaskPage = asyncHandler((req, res) => {
    let name = "name";
    const user = req.session.user;
    if (user) {
        name = user.firstName + " " + user.lastName;
    }
    res.status(200).render("./pages/tasks.ejs", { name });
});
export { getTaskPage };

import Task from "../models/Task.js";

const postTask = asyncHandler(async (req, res) => {
    const data = req.body;

    if (!data.title && !data.content) {
        return res.status(400).json({
            message: "incomplete data",
        });
    }

    const taskObj = new Task(data);
    taskObj.userId = req.session.user.id;
    await taskObj.save();

    res.status(201).json({
        message: "the task added successfully",
        taskId: taskObj._id,
    });
});

export { postTask };

const deleteTask = asyncHandler(async (req, res) => {
    const { taskId } = req.body;
    const cleanId = taskId.trim();

    if (!cleanId) {
        return res.status(400).json({
            message: "unacceptable data",
        });
    }

    const query = {
        userId: req.session.user.id,
        _id: cleanId,
    };
    await Task.deleteOne(query);
    res.status(204).send();
});
export { deleteTask };

const getAllTasks = asyncHandler(async (req, res) => {
    const userId = req.session.user.id;
    const allTasks = await Task.find({
        userId,
    }).select("-userId -_v");
    res.status(200).json(allTasks);
});

export { getAllTasks };

const updateTask = asyncHandler(async (req, res) => {
    const { taskId, taskData } = req.body;
    const cleanId = taskId.trim();
    if (!cleanId) {
        return res.status(400).json({
            message: "unacceptable data",
        });
    }

    const query = {
        userId: req.session.user.id,
        _id: cleanId,
    };

    await Task.updateOne(query, { $set: taskData });
    res.status(200).json({
        message: "update suc",
    });
});
export { updateTask };
