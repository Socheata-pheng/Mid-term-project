// course-service.js
const express = require('express');
require('./dbconnection');
const Course = require('./course-schema');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

// Temporary Student model to validate enrollment
const Student = mongoose.model(
  'Student',
  new mongoose.Schema({
    name: String,
    dob: Date,
    class: String,
    email: String,
  }),
  'students' // use actual collection name
);

// =======================
// Course Routes
// =======================

// Create a course
app.post('/courses', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all courses
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Enroll a student in a course
app.post('/courses/:courseId/enroll', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { studentId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    if (!course.students.includes(studentId)) {
      course.students.push(studentId);
      await course.save();
    }

    res.json({ message: 'Student enrolled successfully', course });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all students in a course
app.get('/courses/:id/students', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('students');
    if (!course) return res.status(404).json({ error: 'Course not found' });

    res.json(course.students);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Course service running at http://localhost:${PORT}`);
});
