// student-schema.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  class: String,
  email: String,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
