const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: String,
  fullName: String,
  role: {
    type: String,
    default: 'user'
  }
});

module.exports = mongoose.model('User', userSchema);
