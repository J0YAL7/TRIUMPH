const mongoose = require('mongoose');


// Define a Mongoose schema for user data
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  is_admin: { type:Number , required: true},
  is_varified: { type:Number ,default: 0 } 
});

// Create a Mongoose model for user data
const User = mongoose.model('users', userSchema);

module.exports = User;
