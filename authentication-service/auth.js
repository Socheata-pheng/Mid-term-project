// auth-service.js
const express = require('express');
require('dotenv').config();
require('./dbconnection');

const jwt = require('jsonwebtoken');
const User = require('./user-schema');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || '52d5bb51a79ebc60a3a255c6de212f5967318db0343124c6a2b0f0a1b4699b9ee9f05a66cc370440a88d1c61e509a017e904410aa030';

app.use(express.json());

// =======================
// Auth Route (Login)
// =======================
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '24h',
    });

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// Start Server
// =======================
app.listen(PORT, () => {
  console.log(`Auth service running at http://localhost:${PORT}`);
});
