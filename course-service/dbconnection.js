// database-connection.js
const mongoose = require('mongoose');
require('dotenv').config();

// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/schoolDB';

mongoose.connect('mongodb+srv://user123:user123@cluster0.0gmnbgu.mongodb.net/schooldb')
  .then(() => console.log('Connected to MongoDB - Course Service'))
  .catch(err => console.error('MongoDB connection error:', err));

mongoose.connection.once('open', () => {
  console.log('MongoDB connected to Course Service');
});

module.exports = mongoose;
