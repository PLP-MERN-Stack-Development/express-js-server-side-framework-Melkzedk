const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');

// Middleware
app.use(logger);
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Hello World'));
app.use('/api/products', productRoutes);

// Error handler
app.use(errorHandler);

// Start server
app.listen(3000, () => console.log('Server running on port 3000'));
