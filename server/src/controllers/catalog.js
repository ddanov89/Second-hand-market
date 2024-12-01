const { Router } = require('express');
const { getAllProducts, getProductById, searchProducts } = require('../services/product');

const catalogRouter = Router();

catalogRouter.get('/catalog', async (req, res) => {
    const products = await getAllProducts();
    res.json(products);
});

catalogRouter.get('/catalog/:id', async (req, res) => {
    
    const product = await getProductById(req.params.id);

    if (!product) {
        res.status(404).json({ code: 404, message: 'Item not found!' });
        return;
    }

    res.json(product);
});

catalogRouter.get('/search', async (req, res) => {
    const { name, category } = req.query;

    const products = await searchProducts(name, category);

    res.json({ data: { name, category }, products });
});

module.exports = { catalogRouter };