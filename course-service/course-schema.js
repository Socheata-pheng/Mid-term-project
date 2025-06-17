const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true }, // Custom course ID like "C001"
  name: { type: String, required: true },
  description: String,
  students: [{ type: String }] // Store studentId (like "001", "002")
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
