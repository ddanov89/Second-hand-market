const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { createToken } = require('../services/jwt');
const { parseError } = require('../util');
const { login, register } = require('../services/user');
const { isGuest } = require('../middlewares/guards');

const userRouter = Router();


userRouter.post('/login', isGuest(),
    body('email').trim().isLength({ min: 10 }).isEmail().withMessage('Email must be at least 10 characters long!'),
    body('password').trim().isLength({ min: 4 }).withMessage('Password must be at least 4 characters long!'),
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
    body('email').trim().isLength({ min: 10 }).isEmail().withMessage('Email must be at least 10 characters long!'),
    body('password').trim().isLength({ min: 4 }).withMessage('Password must be at least 4 characters long!'),
    async (req, res) => {

        const { email, username, password } = req.body;

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
userRouter.get('/logout', (req, res) => {
    res.status(204).end();
});


module.exports = { userRouter };