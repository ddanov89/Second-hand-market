function isUser() {
    return function (req, res, next) {
        
        if (!req.cookies.token) {
            return res.status(401).json({ message: "You are not allowed to do that!" });
        }
        next();
    }
}

function isGuest() {
    return function (req, res, next) {
        if (req.user) {
            res.redirect('/');
        } else {
            next();
        }
    };
}

module.exports = { isUser, isGuest };