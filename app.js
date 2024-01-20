const express = require('express');
const ProductManager = require('./product-manager');

const app = express();
const productManager = new ProductManager('./products.json');

// Importamos la clase ProductManager
app.use(express.json());

// Ruta /products
app.get('/products', async (req, res) => {
    try {
        const products = await productManager.getProducts();
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
        const product = await productManager.getProductById(pid);

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
