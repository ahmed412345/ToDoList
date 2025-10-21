import mongoose from "mongoose";
const connectDB = async _ => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected successfully");
    } catch (e) {
        console.log("connected to mongodb failed", e.message);
        process.exit(1);
    }
};
export default connectDB;
