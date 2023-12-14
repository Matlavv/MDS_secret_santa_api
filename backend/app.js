const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/apinode2')
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('Cannot connect to MongoDB', err));

// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const invitationRoutes = require('./routes/invitationRoutes');

// Use routes
app.use('/users', userRoutes);
app.use('/groups', groupRoutes);
app.use('/invitations', invitationRoutes);

// Start Express server
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
