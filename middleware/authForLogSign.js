export const notRequireLogin = async (req, res, next) => {
    if (req.session.user) {
        return res.redirect("/tasks");
    }
    next();
};
