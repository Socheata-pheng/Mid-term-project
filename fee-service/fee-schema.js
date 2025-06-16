const mongoose = require('../dbconnection');

const FeeSchema = new mongoose.Schema({
  studentId: String,
  amountPaid: Number,
  date: Date,
  term: String
});

const Fee = mongoose.model('Fee', FeeSchema);

module.exports = Fee;
