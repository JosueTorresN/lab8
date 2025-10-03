const toXml = require('./toXML');

const responseFormatter = (req, res, next) => {
  res.success = (statusCode, data) => {
    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      data: data || null, // Para respuestas 204
    };

    if (req.headers.accept === 'application/xml') {
      res.setHeader('Content-Type', 'application/xml');
      return res.status(statusCode).send(toXml(response));
    }
    return res.status(statusCode).json(response);
  };
  next();
};

module.exports = { responseFormatter };