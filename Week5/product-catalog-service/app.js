require('dotenv').config();

const express = require('express');
const productRoutes = require('./productRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', authMiddleware, productRoutes);

module.exports = app;
