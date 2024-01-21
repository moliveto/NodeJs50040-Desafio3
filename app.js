const express = require('express');
const ProductManager = require('./product-manager');

const app = express();

app.use(express.json());

// Middleware to ensure productManager is initialized before routing
app.use(async (req, res, next) => {
    if (!app.locals.productManager) {
        app.locals.productManager = await new ProductManager('./products.json');
    }
    next();
});

app.use(express.json());

// Ruta /products
app.get('/products', async (req, res) => {
    try {
        const products = await app.locals.productManager.getProducts();
        const limit = req.query.limit;

        if (limit) {
            res.send(products.slice(0, limit));
        } else {
            res.send(products);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving products');
    }
});

// Ruta /products/:pid
app.get('/products/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        if (isNaN(pid)) {
            res.status(400).send('id must be a number');
        }
        const product = await app.locals.productManager.getProductById(pid);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving product');
    }
});

// Escuchamos el puerto 3000
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});


/*
async function createAndInitializeManager() {
    return await new ProductManager('./products.json');
}

const productManager = createAndInitializeManager();
console.log(productManager);

const products = productManager.products;
console.log(products);
*/