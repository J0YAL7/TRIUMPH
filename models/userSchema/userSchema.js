const mongoose = require('mongoose');

// Define a Mongoose schema for user data
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

// Create a Mongoose model for user data
const User = mongoose.model('users', userSchema);

module.exports = User;
