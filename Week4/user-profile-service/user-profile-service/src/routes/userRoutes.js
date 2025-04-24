const express = require('express');
const { registerUser, getUserById, getAllUsers, getCurrentUser, updateUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Register a new user
router.get('/', getAllUsers);
router.post('/', registerUser);  // Use registerUser instead of createUser
// Get user by ID (Protected)
router.patch('/:id', updateUser);
router.get('/:id', authMiddleware, getUserById);
router.get('/me', authMiddleware, getCurrentUser);  // New route for logged-in user profile

module.exports = router;
