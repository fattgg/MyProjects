const users = require('../models/userModel');
const { hashPassword } = require('../utils/passwordUtils');
const { validateEmail } = require('../utils/validation');
const { v4: uuidv4 } = require('uuid');

exports.createUser = async (req, res) => {
  const { email, password, name, address } = req.body;
  if (!email || !password || !name || !address) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  const hashedPassword = await hashPassword(password);
  const newUser = { id: uuidv4(), email, password: hashedPassword, name, address, registrationDate: new Date() };
  users.push(newUser);
  res.status(201).json({ id: newUser.id, email: newUser.email, name: newUser.name, address: newUser.address, registrationDate: newUser.registrationDate });
};

exports.getUserById = (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user.id, email: user.email, name: user.name, address: user.address, registrationDate: user.registrationDate });
};