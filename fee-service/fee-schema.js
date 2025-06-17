const mongoose = require('./dbconnection');

const FeeSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    trim: true
  },
  amountPaid: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    default: Date.now
  },
  term: {
    type: String,
    required: true,
    trim: true
  }
});

const Fee = mongoose.model('Fee', FeeSchema);

module.exports = Fee;
