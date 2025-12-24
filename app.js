import dotenv from "dotenv";
//add variables to environment
dotenv.config();

import connectDB from "./config/db.js";
//connet to database mongodb
connectDB();

import express from "express";
const app = express();

import session from "express-session"; // import session

import cMDB from "connect-mongodb-session"; // save every session on db

const connectModule = cMDB(session);
const storeInDB = new connectModule({
    uri: process.env.MONGO_URI,
    collection: "sessions",
});

app.use(
    session({
        secret: process.env.SESSION_KEY, // used to sign the session ID cookie
        resave: false, // don't save session if not modified
        saveUninitialized: false, // don't create empty sessions
        store: storeInDB, // store every session in db
        cookie: {
            maxAge: 24 * 60 * 60 * 1000 * 10,
        },
    })
);
//middleware to make resposnse json;
app.use(express.json());

import { dirname, join } from "path";
import { fileURLToPath } from "url";

//get absolute path
const __dirname = dirname(fileURLToPath(import.meta.url));

//give premission to the public folder
app.use(express.static(join(__dirname, "public")));

//import router for signup page
import singupRouter from "./routes/signup.js";
//user singup routers
app.use("/", singupRouter);

//set display engine
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

//import router for home
import homeRouter from "./routes/home.js";
app.use("/", homeRouter);

//import router for tasks
import taskRouter from "./routes/tasks.js";
app.use("/", taskRouter);

//import router for login
import loginRouter from "./routes/login.js";
app.use("/", loginRouter);

// import router for activation
import activationRouter from "./routes/optCheck.js";
app.use("/", activationRouter);

import logoutRouter from "./routes/logout.js";
app.use("/", logoutRouter);

//chat bot
import chatBotRouter from "./routes/chat.js";
app.use("/", chatBotRouter);

//middleware for handling error
import errorHandler from "./middleware/errorHandler.js";
app.use(errorHandler);

//make server start working
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
