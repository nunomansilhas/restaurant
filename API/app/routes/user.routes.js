const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Fetch a specific user by ID
router.get('/:id', userController.getUserById);

// Delete a specific user by ID
router.delete('/:id', userController.deleteUserById);

module.exports = router;