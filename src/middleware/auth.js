const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Formato: Bearer TOKEN

  if (!token) {
    const error = new Error('Forbidden: No token provided');
    error.statusCode = 403;
    return next(error);
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      const error = new Error('Forbidden: Invalid token');
      error.statusCode = 403;
      return next(error);
    }
    req.user = decoded; // Añade el payload del token (id, role) al objeto request
    next();
  });
};

const hasRole = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    const error = new Error('Forbidden: Insufficient permissions');
    error.statusCode = 403;
    return next(error);
  }
  next();
};

module.exports = { verifyToken, hasRole };