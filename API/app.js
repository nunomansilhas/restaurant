const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Import the database connection (use the corrected path)
const db = require('./app/models/db.js');

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
  db.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Database query failed.');
      return;
    }
    res.send(`Database query result: ${results[0].solution}`);
  });
});

// Load the routes
require('./app/routes/dish.routes.js')(app);   // Dishes routes
require('./app/routes/order.routes.js')(app);  // Orders routes
require('./app/routes/table.routes.js')(app);  // Tables routes
require('./app/routes/layout.routes.js')(app); // Layout routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
