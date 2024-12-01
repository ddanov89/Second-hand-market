const { catalogRouter } = require("../controllers/catalog");
const { productRouter } = require("../controllers/product");
const { userRouter } = require("../controllers/user");

function configRoutes(app) {
    app.use(catalogRouter);
    app.use(productRouter);
    app.use(userRouter);

    app.use('*', (req, res) => {
        res.status(404).json({message: 'Resource not found!'});
    });
}

module.exports = { configRoutes };