const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./apiRoutes');
const { mongoDb } = require('./db');

const app = express();

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// API routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Ensure MongoDB connection is established
mongoDb.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoDb.once('open', () => {
  console.log('MongoDB connection established');
});
