const { body, validationResult } = require('express-validator');

const validateProduct = [
  body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
  body('sku').isString().notEmpty(),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  body('stock').isInt({ gte: 0 }).withMessage('Stock must be 0 or greater'),
  body('category').isString().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 422; // Unprocessable Entity
      error.details = errors.array();
      return next(error);
    }
    next();
  },
];

module.exports = { validateProduct };