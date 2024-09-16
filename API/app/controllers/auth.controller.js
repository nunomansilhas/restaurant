const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const db = require('../models/db');  // Database connection (adjust the path as necessary)

const JWT_SECRET = 'your_secret_key'; // Use your actual secret key

// Controller function to handle user login
exports.login = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // Check if user exists in the database
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const user = results[0];

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  });
};

// Controller function to handle user registration
exports.register = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email, password, role } = req.body;
  
    // Set default role to 'Staff' if none is provided
    const userRole = role ? role : 'Staff';
  
    // Check if user already exists
    const queryCheck = 'SELECT * FROM users WHERE email = ?';
    db.query(queryCheck, [email], async (err, results) => {
      if (results.length > 0) {
        return res.status(400).json({ message: 'User already exists.' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Save the user in the database
      const queryInsert = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
      db.query(queryInsert, [email, hashedPassword, userRole], (err, result) => {
        if (err) {
          console.error('Database insert error:', err);
          return res.status(500).json({ message: 'Server error.' });
        }
        res.status(201).json({ message: 'User registered successfully.' });
      });
    });
  };
