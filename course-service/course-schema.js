const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  students: [String],  // store studentId strings here
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
