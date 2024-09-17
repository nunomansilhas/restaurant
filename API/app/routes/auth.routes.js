const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/middleware-auth.js');
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../img/profile_images/'); // Store files in img/profile_images/ folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Ensure unique file names
    }
});

// Initialize multer with the updated storage config
const upload = multer({ storage: storage });

// Route to get user profile
router.get('/user/profile', verifyToken, authController.getUserProfile);

// Route to update user profile (with profile picture upload)
router.post('/user/update', verifyToken, upload.single('profilePic'), authController.updateUserProfile);

// Login Route
router.post('/login', authController.login);

// Register Route
router.post('/register', authController.register);

module.exports = router;
