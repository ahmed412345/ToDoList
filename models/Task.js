import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    title: String,
    content: String,
    color: String,
    complete: Boolean,
    userId: String,
    date: String,
});

export default mongoose.model("Task", taskSchema);
