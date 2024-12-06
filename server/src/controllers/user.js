const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { createToken } = require('../services/jwt');
const { parseError } = require('../util');
const { login, register, checkUserId, getUserById } = require('../services/user');
const { isGuest, isUser } = require('../middlewares/guards');
const auth = require('../middlewares/auth');

const userRouter = Router();

userRouter.post('/login', isGuest(),
    body('email').notEmpty().isEmail().isLength({ min: 10 }).trim(),
    body('password').notEmpty().isLength({ min: 4 }).trim(),
    async (req, res) => {

        const { email, password } = req.body;

        try {
            const userInformation = await login(email, password);
            const token = createToken(userInformation);
            res.cookie('auth-cookie', token);
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
            res.cookie('auth-cookie', token);
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
    res.clearCookie('auth-cookie');
    res.json(null);
});

userRouter.get("/users", (req, res) => {

    const user = req.body;
    
    const token = req.cookies?.token;
    
    if (token) {
        user.accessToken = token;
    }
    res.json(user);
});

userRouter.get('/profile', auth(), async (req, res) => {
    console.log("We are calling the user on cushions");
    
    const { _id: userId } = req.user;
    console.log("The user is: ", userId);
    
    const isValid = await checkUserId(userId);
    
    if (!isValid) {
        res.status(400).json({ message: "Resource not found!" });
    }
    const user = await getUserById(userId).lean();
    
    res.json(user);
});

module.exports = { userRouter };