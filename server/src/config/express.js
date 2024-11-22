const express = require('express');

const { session } = require('../middlewares/session');
const { cors } = require('../middlewares/cors');


function configExpress(app) {

    app.use(session());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

}

module.exports = { configExpress };