const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const verifyApiKey = require('../middleware/apiKey');
const { verifyToken, hasRole } = require('../middleware/auth');
const { validateProduct } = require('../middleware/validator');

// Rutas públicas (solo API Key)
router.get('/', verifyApiKey, productController.getAllProducts);
router.get('/:id', verifyApiKey, productController.getProductById);

// Rutas protegidas (JWT + Roles)
router.post('/', verifyToken, hasRole(['admin', 'editor']), validateProduct, productController.createProduct);
router.put('/:id', verifyToken, hasRole(['admin', 'editor']), validateProduct, productController.updateProduct);
router.delete('/:id', verifyToken, hasRole(['admin']), productController.deleteProduct);

module.exports = router;