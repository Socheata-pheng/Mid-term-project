const mongoose = require('../dbconnection');

const ResultSchema = new mongoose.Schema({
  studentId: String,
  courseId: String,
  grade: String,
  marks: Number,
  term: String
});

const Result = mongoose.model('Result', ResultSchema);

module.exports = Result;
