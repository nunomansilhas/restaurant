const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller'); // Import the auth controller

// Login Route
router.post('/login', authController.login);

// Register Route
router.post('/register', authController.register);

module.exports = router;
