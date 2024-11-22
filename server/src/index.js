const express = require('express');
const { configExpress } = require('./config/express');
const { configDatabase } = require('./config/database');
const { configRoutes } = require('./config/routes');

const PORT = process.env.PORT || 3000;

start();

async function start() {

    const app = express();

    await configDatabase()
    configExpress(app);
    configRoutes(app);

    app.listen(PORT, () => {
        console.log(`Server started http://localhost:${PORT}!`);
    });
}