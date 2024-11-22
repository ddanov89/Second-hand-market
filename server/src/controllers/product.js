const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { parseError } = require('../util');
const { isUser } = require('../middlewares/guards');
const { decodeToken } = require('../services/jwt');
const { createProduct, updateProduct, deleteProductById, subscribeToProduct, getAllMySavedProducts } = require('../services/product');

const productRouter = Router();

productRouter.post('/create', isUser(),
    body('name').trim().isLength({ min: 4 }).withMessage('Name should be at least 4 characters long!'),
    body('image').trim().isURL({ require_tld: false, require_protocol: true }).withMessage('Image should be start with http:// or https://!'),
    body('description').trim().isLength({ min: 10 }).withMessage('Description should be at least 10 characters long!'),
    body('price').trim().isLength({ min: 1, max: 5 }).withMessage('Price should be a non-negative number between 1 and 5!'),
    body('category').trim(),
    async (req, res) => {
        const userData = decodeToken(req);
        const userId = userData?._id.toString();

        try {
            const validation = validationResult(req);
            if (validation.errors.length) {
                throw validation.errors;
            }
            const result = await createProduct(req.body, userId);
            res.json(result);
        } catch (error) {
            const parsed = parseError(error).errors;
            res.status(400).json({ code: 400, message: parsed.message });
        }
    });

productRouter.put('/edit/:id', isUser(),
    body('name').trim().isLength({ min: 4 }).withMessage('Name should be at least 4 characters long!'),
    body('image').trim().isURL({ require_tld: false, require_protocol: true }).withMessage('Image should be start with http:// or https://!'),
    body('description').trim().isLength({ min: 10 }).withMessage('Description should be at least 10 characters long!'),
    body('price').trim().isLength({ min: 1, max: 5 }).withMessage('Price should be a non-negative number between 1 and 5!'),
    body('category').trim(),
    async (req, res) => {
        const userData = decodeToken(req);
        const userId = userData._id.toString();
        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const result = await updateProduct(req.params.id, req.body, userId);
            res.json(result);

        } catch (error) {
            const parsed = parseError(error).errors;
            res.status(400).json({ code: 400, message: parsed.message });
        }
    });

productRouter.delete('/delete/:id', isUser(), async (req, res) => {
    const productId = req.params.id;
    const userData = decodeToken(req);
    const userId = userData._id.toString();
    try {
        await deleteProductById(productId, userId);
        res.status(204).end();
    } catch (error) {
        if (error.message == 'Access denied!') {
            res.status(403).json({ code: 403, message: 'Access denied!' });
        } else if (error instanceof ReferenceError) {
            res.status(404).json({ code: 404, message: 'Item not found!' });
        } else {
            res.status(400).json({ code: 400, message: parseError(error).message });
        }
    }
});

productRouter.post('/subscribe/:id', async (req, res) => {
    const productId = req.params.id;
    const userId = req.body.userId
    try {

        const result = await subscribeToProduct(productId, userId);
        res.json(result);
    } catch (error) {
        res.json({ errors: parseError(error).errors });
    }
});

productRouter.get('/profile', isUser(), async (req, res) => {
    const userData = decodeToken(req);
    const userId = userData._id.toString();
    const products = await getAllMySavedProducts(userId);
    const email = userData.email.toString();
    res.json({ products, email });
});

module.exports = { productRouter };