const express = require('express');
const app = express();
const { responseFormatter } = require('./utils/responseFormatter');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');

app.use(express.json());
app.use(responseFormatter); // Añade el método res.success

// Rutas de la API
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// El manejador de errores debe ser el último middleware
app.use(errorHandler);

module.exports = app;