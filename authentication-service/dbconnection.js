// database-connection.js
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb+srv://user123:user123@cluster0.0gmnbgu.mongodb.net/schooldb')
  .then(() => console.log('Connected to MongoDB - Auth Service'))
  .catch(err => console.error('MongoDB connection error:', err));

mongoose.connection.once('open', () => {
  console.log('MongoDB connected to Auth Service');
});

module.exports = mongoose;
