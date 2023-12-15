const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'secret santa API',
      version: '1.0.0',
      description: 'API MongoDB database, axios, express',
    },
  },

  apis: ['./docSwagger/*.js'],
};

// Initialize Swagger
const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  serveSwaggerUI: swaggerUi.serve,
  setupSwaggerUI: swaggerUi.setup(swaggerSpec),
};