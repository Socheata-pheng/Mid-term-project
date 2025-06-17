const express = require('express');
require('./dbconnection');
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

// GET: Fee summary by studentId (custom ID)
app.get('/fees/:studentId', async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const fees = await Fee.find({ studentId });
    const totalPaid = fees.reduce((sum, fee) => sum + fee.amountPaid, 0);

    const fullFee = 10000; // Example total fee for every student
    const totalDue = Math.max(0, fullFee - totalPaid);
    const lateFee = totalDue > 0 ? 500 : 0;

    res.json({
      studentId,
      totalPaid,
      totalDue,
      fullFee,
      lateFee,
      records: fees,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: List all overdue students
app.get('/fees/overdue', async (req, res) => {
  try {
    const fullFee = 10000;

    const overdue = await Fee.aggregate([
      {
        $group: {
          _id: '$studentId',
          totalPaid: { $sum: '$amountPaid' },
        },
      },
      {
        $match: {
          totalPaid: { $lt: fullFee },
        },
      },
      {
        $project: {
          studentId: '$_id',
          totalPaid: 1,
          totalDue: { $subtract: [fullFee, '$totalPaid'] },
          _id: 0,
        },
      },
    ]);

    res.json(overdue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Fee Service running on port ${PORT}`));
