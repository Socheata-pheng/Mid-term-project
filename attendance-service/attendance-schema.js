const mongoose = require('../dbconnection');

const AttendanceSchema = new mongoose.Schema({
  studentId: String,
  date: Date,
  status: { type: String, enum: ['present', 'absent'] }
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
