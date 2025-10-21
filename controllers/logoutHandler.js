const getLogoutPage = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "error while logging out" });
        }

        res.clearCookie("connect.sid");
        res.redirect("/login");
    });
};
export { getLogoutPage };
