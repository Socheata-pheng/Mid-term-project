const mongoose = require('./dbconnection');

const AttendanceSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,           // ensures studentId is provided
    trim: true,
  },
  date: {
    type: Date,
    required: true,           // ensures attendance date is provided
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    required: true            // ensures status is provided
  }
});

// Optional: prevent duplicate attendance for same student on same date
AttendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
