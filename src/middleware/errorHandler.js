const toXml = require('../utils/toXML');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const errorResponse = {
    error: {
      code: err.code || getErrorCode(statusCode),
      message: err.message || 'An internal server error occurred',
      details: err.details || [],
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    },
  };

  if (req.headers.accept === 'application/xml') {
    res.setHeader('Content-Type', 'application/xml');
    return res.status(statusCode).send(toXml(errorResponse));
  }
  res.status(statusCode).json(errorResponse);
};

const getErrorCode = (statusCode) => {
    switch (statusCode) {
        case 400: return 'BAD_REQUEST';
        case 401: return 'UNAUTHORIZED';
        case 403: return 'FORBIDDEN';
        case 404: return 'NOT_FOUND';
        case 409: return 'CONFLICT';
        case 422: return 'UNPROCESSABLE_ENTITY';
        default: return 'INTERNAL_SERVER_ERROR';
    }
}

module.exports = errorHandler;