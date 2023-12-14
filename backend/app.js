const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/apinode2')
  .then(() => console.log('Succefully connected to MongoDB.'))
  .catch(err => console.error('Cannot connect to MongoDB', err));

// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// users routes
const userRoute = require('./routes/userRoute');
app.use('/users', userRoute);

// express server
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
