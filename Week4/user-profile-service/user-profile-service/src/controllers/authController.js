const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const supabase = require('../utils/supabaseClient'); // Assuming you have Supabase set up

dotenv.config(); // Load environment variables

// Function to compare password using bcrypt
const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Step 1: Find the user by email from Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single(); // Get one user (assuming email is unique)

    // Handle user not found or any other error
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Step 2: Compare provided password with the stored hashed password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Step 3: Generate a JWT token with user ID
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Step 4: Update last login timestamp
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    // Step 5: Respond with the JWT token and user ID (excluding password)
    const { password: _, ...userWithoutPassword } = user; // Exclude password
    res.json({ token, userId: user.id, user: userWithoutPassword });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
