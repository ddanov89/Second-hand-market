const {User} = require('../models/User');
const {TokenBlacklist} = require('../models/TokenBlacklist');
const { verifyToken } = require('../services/jwt');


function auth(redirectUnauthenticated = true) {

    return function (req, res, next) {
        console.log("Logging from auth method");
        
        const token = req.cookies['token'] || '';
        console.log("The token is: ", token);
        Promise.all([
            verifyToken(token),
            TokenBlacklist.findOne({ token })
        ])
            .then(([data, blacklistedToken]) => {
                if (blacklistedToken) {
                    return Promise.reject(new Error('blacklisted token'));
                }
                User.findById(data.id)
                    .then(user => {
                        req.user = user;
                        req.isLogged = true;
                        next();
                    })
            })
            .catch(err => {
                if (!redirectUnauthenticated) {
                    next();
                    return;
                }
                if (['token expired', 'blacklisted token', 'jwt must be provided'].includes(err.message)) {
                    console.error(err);
                    res
                        .status(401)
                        .send({ message: "Invalid token!" });
                    return;
                }
                next(err);
            });
    }
}

module.exports = auth;