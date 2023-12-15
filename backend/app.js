const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Swagger configuration
const swagger = require('./swagger');
app.use('/api-docs', swagger.serveSwaggerUI, swagger.setupSwaggerUI);

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/apisecretsanta')
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('Cannot connect to MongoDB', err));

// Middleware 
app.use(express.urlencoded());
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');

app.use('/users', userRoutes);

// Start Express server
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
