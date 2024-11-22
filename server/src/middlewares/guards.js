function isUser() {
    return function (req, res, next) {
        if (!req.headers['x-authorization']) {
            res.status(401).json({code:401, message: 'Missing credentials. Please login!'});
        } else {
            next();
        }
    };
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