const userService = require('../services/userService');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all users (Protected)
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers(); // Assuming userService has a getAllUsers method
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID (Protected)
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user details (Protected)
const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get current user profile (Protected) using Bearer token
const getCurrentUser = async (req, res) => {
  try {
    // Extract user ID from the token payload (already set by authMiddleware)
    const userId = req.user.id;

    // Fetch the user based on the ID from the database
    const user = await userService.getUserById(userId);

    // If user is not found, return 404
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Return the user's profile data
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = { registerUser, getUserById, updateUser, getCurrentUser, getAllUsers, getCurrentUser };
