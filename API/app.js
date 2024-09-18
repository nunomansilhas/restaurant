const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const db = require('./app/models/db'); // Database connection (replace with your actual path)
const authRoutes = require('./app/routes/auth.routes.js'); // Import auth routes
const userRoutes = require('./app/routes/user.routes.js'); // Import user routes
const orderItemsRoutes = require('./app/routes/order-items.routes.js'); // Import order-items routes

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your_secret_key'; // Replace with your actual secret key

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route to ensure server is running
app.get('/', (req, res) => {
  res.send('Server is working!');
});

// Middleware to protect routes (JWT Verification)
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from headers
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token.' });
    }

    req.user = decoded; // Add decoded user info to request object
    next();
  });
};

// Protected route example (GET /api/dashboard)
app.get('/api/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Welcome to the dashboard, user ${req.user.id}!`, role: req.user.role });
});

// Load the auth routes for login and register
app.use('/api', authRoutes);

// Load the user routes
app.use('/api/users', verifyToken, userRoutes); // Protect user routes with verifyToken

// Load the order items routes
app.use('/api/order-items', verifyToken, orderItemsRoutes); // Protect order-items routes with verifyToken

// Load the other routes (dishes, orders, tables, layout)
require('./app/routes/dish.routes.js')(app);   // Handles all dish-related routes
require('./app/routes/order.routes.js')(app);  // Handles all order-related routes
require('./app/routes/table.routes.js')(app);  // Handles all table-related routes
require('./app/routes/layout.routes.js')(app); // Handles all layout-related routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});