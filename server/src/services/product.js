const { Product } = require('../models/Product');

async function getAllProducts() {

    return Product.find().lean();
}

async function getProductById(id) {

    return Product.findById(id).lean();
}

async function createProduct(data, authorId) {
    
    const record = new Product({
        name: data.name,
        image: data.image,
        description: data.description,
        price: data.price,
        category: data.category,
        author: authorId
    });

    await record.save();

    return record;
}

async function updateProduct(productId, data, userId) {

    const record = await Product.findById(productId);

    if (!record) {
        throw new Error('Record not found' + productId);
    }

    if (record.author.toString() != userId) {
        throw new Error('Access denied!');
    }

        record.name = data.name,
        record.image = data.image,
        record.description = data.description,
        record.price = data.price,
        record.category = data.category

    await record.save();

    return record;

}

async function deleteProductById(productId, userId) {

    const record = await Product.findById(productId);

    if (!record) {
        throw new Error('Record not found' + productId);
    }

    if (record.author.toString() != userId) {
        throw new Error('Access denied!');
    }

    await Product.findByIdAndDelete(productId);
}

async function searchProducts(name, category) {

    const query = {};

    if (name) {
        query.name = new RegExp(name, 'i');
    }
    if (category && category != '---') {
        query.category = category;
    }
    return Product.find(query).lean();
}

async function subscribeToProduct(productId, userId) {

    const record = await Product.findById(productId);
    
    if (!record) {
        
        throw new Error('Record not found' + productId);
    }
    if (record.author.toString() == userId) {
        throw new Error('Cannot subscribe your own product!');
    }
    if (record.subscribers.find(subscriber => subscriber?.toString() == userId)) {
        throw new Error('You can only subscribe this product once!');
    }

    record.subscribers.push(userId);

    await record.save();
    return record;
}

async function getAllMySavedProducts(userId) {
    return await Product.find({ author: userId }).lean();
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProductById,
    searchProducts,
    subscribeToProduct,
    getAllMySavedProducts
};