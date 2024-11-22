const { Schema, model, Types } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ["Clothes", "Car Seats", "Strollers", "Toys", "Cribs"],
        required: true,
    },
    subscribers: {
        type: [Types.ObjectId],
        required: true,
        default: []
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Product = model('Product', productSchema);

module.exports = { Product };