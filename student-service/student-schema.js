const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, unique: true, required: true }, // unique student ID
  name: String,
  dob: Date,
  class: String,
  email: String,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
