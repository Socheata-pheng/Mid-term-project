const express = require('express');
const Attendance = require('./attendance-schema');

const app = express();
const PORT = 3005;

app.use(express.json());

// POST: Record attendance
app.post('/attendance', async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Attendance summary by student ID
app.get('/attendance/:studentId', async (req, res) => {
  try {
    const records = await Attendance.find({ studentId: req.params.studentId });
    const presentDays = records.filter(r => r.status === 'present').length;
    const totalDays = records.length;
    const percentage = totalDays ? (presentDays / totalDays) * 100 : 0;

    res.json({ presentDays, totalDays, percentage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: All attendance records
app.get('/attendance', async (req, res) => {
  try {
    const records = await Attendance.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Attendance Service running on port ${PORT}`));
