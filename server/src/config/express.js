const express = require('express');

const { session } = require('../middlewares/session');
const { cors } = require('../middlewares/cors');
const cookieParser = require('cookie-parser');

const secret = 'secret';

function configExpress(app) {

    app.use(cookieParser(secret));
    app.use(session());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

}

module.exports = { configExpress };