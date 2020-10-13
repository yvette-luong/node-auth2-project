module.exports = (req, res, next) => {
    console.log("session", req.session);
    if (req.username) {
        next();
    } else {
        res.status(401).json({ you: "dare u to pass!" });
    }
};
