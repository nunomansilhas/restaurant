const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./app/models/db'); // Database connection (replace with your actual path)
const { check, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your_secret_key'; // Replace with your secret key

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route to ensure server is running
app.get('/', (req, res) => {
  res.send('Server is working!');
});

// Test database connection
app.get('/testdb', (req, res) => {
  db.query('SELECT 1 + 1 AS solution', (error, results) => {
    if (error) {
      console.error('Database connection error:', error);
      return res.status(500).send('Database connection failed.');
    }
    res.send(`Database query result: ${results[0].solution}`);
  });
});

// Login Route (POST /api/login)
app.post('/api/login', [
  check('email', 'Please provide a valid email').isEmail(),
  check('password', 'Password is required').exists()
], (req, res) => {
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
});

// Register Route (POST /api/register)
app.post('/api/register', [
  check('email', 'Please provide a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, role } = req.body; // Ensure `role` exists in the request

  // Check if user already exists
  const queryCheck = 'SELECT * FROM users WHERE email = ?';
  db.query(queryCheck, [email], async (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the user in the database
    const queryInsert = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
    db.query(queryInsert, [email, hashedPassword, role], (err, result) => {
      if (err) {
        console.error('Database insert error:', err);
        return res.status(500).json({ message: 'Server error.' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// Middleware to protect routes
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token.' });
    }

    req.user = decoded;
    next();
  });
};

// Protected route example (GET /api/dashboard)
app.get('/api/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Welcome to the dashboard, user ${req.user.id}!`, role: req.user.role });
});

// Load the routes for other features (dishes, orders, tables)
require('./app/routes/dish.routes.js')(app);   // Handles all dish-related routes
require('./app/routes/order.routes.js')(app);  // Handles all order-related routes
require('./app/routes/table.routes.js')(app);  // Handles all table-related routes
require('./app/routes/layout.routes.js')(app); // Handles all layout-related routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
