const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const app = express();
app.use(express.json());

// Routes
app.use('/users', userRoutes);

module.exports = app; // Only export the app, not app.listen
