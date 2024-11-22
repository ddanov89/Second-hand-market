const { Router } = require('express');
const { getAllProducts, getProductById, searchProducts } = require('../services/product');

const catalogRouter = Router();

catalogRouter.get('/catalog', async (req, res) => {
    const products = await getAllProducts();
    res.render('catalog', { products });
});

catalogRouter.get('/catalog/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await getProductById(productId);

    if (!product) {
        res.status(404).render('404');
    }
    product.subscribers = product.subscribers.length;

    product.hasUser = res.locals.hasUser;
    product.isAuthor = req.user._id == product.author.toString();
    product.hasBeenSubscribed = Boolean(product.subscribers.find(b => b.toString() == req.user._id));

    res.render('details', { product: product });
});

catalogRouter.get('/search', async (req, res) => {

    const { name, category } = req.query;

    const products = await searchProducts(name, category);

    res.render('search', { data: { name, category }, products });
});

module.exports = { catalogRouter };