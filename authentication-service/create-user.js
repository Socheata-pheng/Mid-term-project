// createUsers.js
const mongoose = require('mongoose');
const User = require('./user-schema');
require('dotenv').config();

mongoose.connect('mongodb://mongodb:27017/auth')

const seedUsers = async () => {
  await User.deleteMany({});
  await User.create([
    { username: 'admin1', password: 'adminpass', role: 'admin' },
    { username: 'teacher1', password: 'teacherpass', role: 'teacher' },
  ]);
  console.log('Users created');
  mongoose.disconnect();
};

seedUsers();
