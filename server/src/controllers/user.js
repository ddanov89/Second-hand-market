const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { createToken, decodeToken } = require('../services/jwt');
const { parseError } = require('../util');
const { login, register, checkUserId, getUserById } = require('../services/user');
const { isGuest, isUser } = require('../middlewares/guards');

const userRouter = Router();

userRouter.post('/login', isGuest(),
    body('email').notEmpty().isEmail().isLength({ min: 10 }).trim(),
    body('password').notEmpty().isLength({ min: 4 }).trim(),
    async (req, res) => {

        const { email, password } = req.body;

        try {
            const userInformation = await login(email, password);
            const token = createToken(userInformation);
            res.cookie('token', token);
            res.json({
                _id: userInformation._id,
                email: userInformation.email,
                token
            });
        } catch (error) {
            res.status(403).json({ code: 403, message: 'Incorrect email or password!' });
        }
    });

userRouter.post('/register', isGuest(),
    body('email').notEmpty().isEmail().isLength({ min: 10 }).trim(),
    body('password').notEmpty().isLength({ min: 4 }).trim(),
    body("rePass").notEmpty().custom((value, { req }) => req.body.password == value).trim(),
    async (req, res) => {

        const { email, password } = req.body;

        try {

            const validation = validationResult(req);
            if (validation.errors.length) {
                throw validation.errors;
            }

            const userInformation = await register(email, password);
            const token = createToken(userInformation);
            res.cookie('token', token);
            res.json({
                _id: userInformation._id,
                email: userInformation.email,
                token
            });
        } catch (error) {
            const parsed = parseError(error).errors;

            res.status(403).json({ code: 403, message: parsed.message });
        }
    });

userRouter.get('/logout', isUser(), (req, res) => {
    res.clearCookie('token');
    res.json(null);
});

userRouter.get("/users/profile", async (req, res) => {

    const user = decodeToken(req);

    const token = req.cookies?.token;

    const userId = user?._id;

    if (token) {
        user.accessToken = token;
    }
    const isValid = await checkUserId(userId);

    if (!isValid) {
        res.status(400).json({ message: "Resource not found!" });
    } else {
        res.json(user);
    }
});

module.exports = { userRouter };