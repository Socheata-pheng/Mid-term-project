const express = require('express');
const Fee = require('./fee-schema');

const app = express();
const PORT = 3006;

app.use(express.json());

// POST: Add fee payment
app.post('/fees', async (req, res) => {
  try {
    const fee = new Fee(req.body);
    await fee.save();
    res.status(201).json(fee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Fee summary by student ID
app.get('/fees/:studentId', async (req, res) => {
  try {
    const fees = await Fee.find({ studentId: req.params.studentId });
    const totalPaid = fees.reduce((sum, fee) => sum + fee.amountPaid, 0);
    const totalDue = 10000 - totalPaid; // Example assumption
    const lateFee = totalDue > 0 ? 500 : 0;

    res.json({ paid: totalPaid, due: totalDue, total: 10000, lateFee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Overdue students
app.get('/fees/overdue', async (req, res) => {
  try {
    const overdue = await Fee.aggregate([
      { $group: { _id: '$studentId', totalPaid: { $sum: '$amountPaid' } } },
      { $match: { totalPaid: { $lt: 10000 } } }
    ]);

    res.json(overdue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Fee Service running on port ${PORT}`));
