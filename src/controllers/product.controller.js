const { v4: uuidv4 } = require('uuid');
const { readData, writeData } = require('../services/jsonDb.service');

// GET /products (con paginación)
const getAllProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await readData('products.json');
    const paginatedProducts = products.slice((page - 1) * limit, page * limit);
    res.success(200, paginatedProducts);
  } catch (error) {
    next(error);
  }
};

// GET /products/:id
const getProductById = async (req, res, next) => {
  try {
    const products = await readData('products.json');
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      return next(error);
    }
    res.success(200, product);
  } catch (error) {
    next(error);
  }
};

// POST /products
const createProduct = async (req, res, next) => {
  try {
    const products = await readData('products.json');
    const { name, sku, price, stock, category } = req.body;
    if (products.some(p => p.sku === sku)) {
      const error = new Error('Conflict: SKU already exists');
      error.statusCode = 409;
      return next(error);
    }
    const newProduct = { id: uuidv4(), name, sku, price, stock, category };
    products.push(newProduct);
    await writeData('products.json', products);
    res.success(201, newProduct);
  } catch (error) {
    next(error);
  }
};

// PUT /products/:id
const updateProduct = async (req, res, next) => {
    try {
        let products = await readData('products.json');
        const productIndex = products.findIndex(p => p.id === req.params.id);
        if (productIndex === -1) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            return next(error);
        }
        const { sku } = req.body;
        if (products.some(p => p.sku === sku && p.id !== req.params.id)) {
            const error = new Error('Conflict: SKU already exists');
            error.statusCode = 409;
            return next(error);
        }
        const updatedProduct = { ...products[productIndex], ...req.body };
        products[productIndex] = updatedProduct;
        await writeData('products.json', products);
        res.success(200, updatedProduct);
    } catch (error) {
        next(error);
    }
};

// DELETE /products/:id
const deleteProduct = async (req, res, next) => {
    try {
        let products = await readData('products.json');
        const initialLength = products.length;
        products = products.filter(p => p.id !== req.params.id);
        if (products.length === initialLength) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            return next(error);
        }
        await writeData('products.json', products);
        res.success(204); // No Content
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };