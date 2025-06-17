// createUsers.js
const mongoose = require('mongoose');
const User = require('./user-schema');
require('dotenv').config();

mongoose.connect('mongodb+srv://user123:user123@cluster0.0gmnbgu.mongodb.net/schooldb')
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
