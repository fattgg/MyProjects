const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const supabase = require('../utils/supabaseClient');;

const createUser = async (userData) => {
  const { email, password, name, address } = userData;

  // Validate input
  if (!email) {
    throw new Error('Email is required');
  }
  if (!password) {
    throw new Error('Password is required');
  }

  // Check if user already exists
  const { data: existingUsers, error: checkError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single(); // assuming unique emails

  if (checkError && checkError.code !== 'PGRST116') { // ignore "No rows found"
    throw new Error(`Error checking user: ${checkError.message}`);
  }

  if (existingUsers) {
    throw new Error('Email already in use');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user object
  const newUser = {
    id: uuidv4(),
    email,
    password: hashedPassword,
    name,
    address,
    registration_date: new Date().toISOString(),
    last_login: null
  };

  // Insert into Supabase
  const { data, error } = await supabase
    .from('users')
    .insert([newUser])
    .select(); // return inserted row

  if (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }

  // Exclude password from response
  const { password: _, ...userWithoutPassword } = data[0];
  return userWithoutPassword;
};


// Get user by ID
const getUserById = async (id) => {
  // Query Supabase to get the user by ID
  const { data, error } = await supabase
    .from('users')
    .select('*')        // Select all columns
    .eq('id', id)       // Match by user ID
    .single();          // Only return one row (since ID should be unique)

  // Handle errors if any
  if (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }

  if (!data) {
    return null;  // If no user is found, return null
  }

  // Exclude password from response
  const { password, ...userWithoutPassword } = data;

  return userWithoutPassword;  // Return user without the password field
};


// Update user details
const updateUser = async (id, updateData) => {
  // Update the user record in Supabase by user id
  const { data, error } = await supabase
    .from('users')
    .update(updateData)  // update the fields with updateData
    .eq('id', id)        // match by user id
    .select();           // return the updated row(s)

  // Handle errors if any
  if (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }

  // Exclude password from response
  const { password, ...updatedUserWithoutPassword } = data[0];

  return updatedUserWithoutPassword;  // Return updated user without password
};


// Get user by email (used for authentication)
const getUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

// Update last login timestamp
const updateLastLogin = (id) => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    users[userIndex].lastLogin = new Date().toISOString();
  }
};

// Get all users
const getAllUsers = async () => {
  try {
    return users;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

module.exports = { createUser, getUserById, updateUser, getUserByEmail, updateLastLogin, getAllUsers };
