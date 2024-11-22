const mongoose = require('mongoose');

require('../models/User');
require('../models/Product');

async function configDatabase() {
    const connectionString = 'mongodb://0.0.0.0:27017/second-hand-market';

    await mongoose.connect(connectionString);
    console.log("Database connected!");
}

module.exports = { configDatabase };