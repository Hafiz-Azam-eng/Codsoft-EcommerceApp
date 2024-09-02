const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).send('User registered');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, 'codSoft', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Verify token middleware
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).send('No token, authorization denied');
  }

  try {
    const decoded = jwt.verify(token, 'codSoft');
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).send('Token is not valid');
  }
};

module.exports = {
  register,
  login,
  auth
};
