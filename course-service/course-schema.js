// course-schema.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
