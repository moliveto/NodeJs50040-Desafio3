const ProductManager = require('./product-manager');

async function testProductManager() {
    try {

        const productManager = await new ProductManager('./products.json');

        // Obtener los productos (ahora que la inicialización está completa)
        const products = productManager.products;
        console.log(products);

        // Obtener todos los productos
        const productsGet = await productManager.getProducts();
        console.log(productsGet);

        // Agregar un producto
        const product = await productManager.addProduct({
            title: "Producto prueba 5",
            description: "Este es un producto prueba",
            price: 120,
            thumbnail: "Sin imagen",
            code: "12345",
            stock: 10,
        });
        console.log(product);

        // Obtener un producto por id
        const productById = await productManager.getProductById(1);
        console.log(productById);

        // Actualizar un producto
        await productManager.updateProduct(1, {
            title: "Producto actualizado",
        });

    } catch (error) {
        console.error(error);
    }
}

testProductManager();