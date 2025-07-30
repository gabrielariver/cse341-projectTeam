const User = require('../models/user');

// GET
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET
exports.getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Invalid request' });
  }
};

// POST
exports.createUser = async (req, res) => {
  try {
    const { username, email, fullName, role } = req.body;

    if (!username || !email || !fullName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = new User({ username, email, fullName, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create user', error: err.message });
  }
};

// PUT
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      req.body,
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update user', error: err.message });
  }
};

// DELETE 
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ username: req.params.username });
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete user', error: err.message });
  }
};
