//wrapper function for handling error
import asyncHandler from "./asyncHandler.js";

const getHomePage = asyncHandler((req, res) => {
    //if user in session change btns
    const user = req?.session?.user;
    let loginBtn = "log in";
    let signupBtn = "start now";
    if (user) {
        loginBtn = "tasks";
        signupBtn = "profile";
    }

    res.status(200).render("./pages/home.ejs", { loginBtn, signupBtn });
});
export { getHomePage };
