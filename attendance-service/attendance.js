const express = require('express');
require('./dbconnection');
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

// GET: Attendance summary by studentId
app.get('/attendance/:studentId/summary', async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const records = await Attendance.find({ studentId });

    const presentDays = records.filter(r => r.status === 'present').length;
    const totalDays = records.length;
    const percentage = totalDays ? (presentDays / totalDays) * 100 : 0;

    res.json({
      studentId,
      totalDays,
      presentDays,
      percentage: percentage.toFixed(2) + '%'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: All attendance records (optionally filter by studentId)
app.get('/attendance', async (req, res) => {
  try {
    const { studentId } = req.query;
    const filter = studentId ? { studentId } : {};
    const records = await Attendance.find(filter);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Attendance Service running on port ${PORT}`));
