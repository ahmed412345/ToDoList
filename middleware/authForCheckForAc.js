export const signupFirst = async (req, res, next) => {
    if (!req.session.email) {
        return res.redirect("/signup");
    }
    if (req.session.user?.firstName) {
        return res.redirect("/tasks");
    }
    next();
};
