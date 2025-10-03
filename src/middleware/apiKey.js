const config = require('../config');

const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== config.apiKey) {
    const error = new Error('Unauthorized: Invalid API Key');
    error.statusCode = 401;
    return next(error);
  }
  next();
};

module.exports = verifyApiKey;