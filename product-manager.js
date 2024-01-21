const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.isInitialized = false;

        // Devolver una promesa para la inicialización
        return new Promise((resolve, reject) => {
            this.readFromFile()
                .then(() => {
                    this.isInitialized = true;
                    resolve(this);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    async addProduct(product) {
        // Validar que no se repita el código
        if (this.products.find((p) => p.code === product.code)) {
            throw new Error("El código del producto ya existe");
        }

        // Validar que todos los campos sean obligatorios
        if (!product.title || !product.description || !product.price || !product.code || !product.stock) {
            throw new Error("Todos los campos son obligatorios");
        }

        // Crear el producto con un id autoincrementable
        const id = this.products.length + 1;
        product.id = id;

        // Guardar el producto en el arreglo
        this.products.push(product);

        // Guardar el arreglo en el archivo
        await this.writeToFile();

        return product;
    }

    async getProducts() {
        const products = this.products;
        //console.log(products);
        return products;
    }

    async getProductById(id) {
        //console.log(id);
        const products = this.products;
        //console.log(products);
        // Buscar el producto con el id especificado
        const product = products.find((p) => p.id == id);
        //console.log(product);
        return product;
    }

    async updateProduct(id, product) {
        // Validar que el producto exista
        const existingProduct = this.getProductById(id);
        if (!existingProduct) {
            throw new Error("El producto no existe");
        }

        // Actualizar el producto
        existingProduct.title = product.title;
        existingProduct.description = product.description;
        existingProduct.price = product.price;
        existingProduct.thumbnail = product.thumbnail;
        existingProduct.stock = product.stock;

        // Guardar el arreglo en el archivo
        await this.writeToFile();

        return existingProduct;
    }

    async deleteProduct(id) {
        // Validar que el producto exista
        const existingProduct = this.getProductById(id);
        if (!existingProduct) {
            throw new Error("El producto no existe");
        }

        // Eliminar el producto del arreglo
        this.products = this.products.filter((p) => p.id !== id);

        // Guardar el arreglo en el archivo
        await this.writeToFile();
    }

    async readFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            console.log("File readed");
        } catch (error) {
            console.error('Error initializing ProductManager:', error);
            console.log("File error");
            this.products = [];
        }
    }

    async writeToFile() {
        return new Promise((resolve, reject) => {
            try {
                const data = JSON.stringify(this.products, null, 2);
                fs.writeFileSync(this.path, data);
                resolve("write Ok");
            } catch (error) {
                reject("write fail", error);
            }
        });
    }
}

module.exports = ProductManager;

/*
async init() {
    try {
        this.products = await this.readFromFile();
        this.isInitialized = true;
    } catch (error) {
        console.error('Error initializing ProductManager:', error);
        this.products = [];
    }
}

async readFromFilePromise() {
    return new Promise((resolve, reject) => {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            console.log("Promesa resuelta");
            resolve(JSON.parse(data));
        } catch (error) {
            console.log("Promesa resuelta en catch", error);
            reject(error);
        }
    });
}
*/