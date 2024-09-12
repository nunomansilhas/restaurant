const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const db = require('../models/db.js'); // DB connection
const router = express.Router();

// @route    POST /api/register
// @desc     Register a new user
// @access   Public
router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role } = req.body; // Include other user fields if necessary

    // Check if user already exists
    const queryCheck = 'SELECT * FROM users WHERE email = ?';
    db.query(queryCheck, [email], async (err, results) => {
      if (results.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Save the user into the database
      const queryInsert = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
      db.query(queryInsert, [email, hashedPassword, role], (err, result) => {
        if (err) {
          console.error('Error saving user to database:', err);
          return res.status(500).json({ message: 'Server error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  }
);

module.exports = router;
