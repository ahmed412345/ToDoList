export const requireLogin = async (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
};
