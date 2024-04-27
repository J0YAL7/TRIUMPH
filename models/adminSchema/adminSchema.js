const mongoose = require('mongoose');


// Define a Mongoose schema for admin data
const adminSchema = new mongoose.Schema({
  password: { type: String, required: true },
 
  email: { type: String, required: true },

});

// Create a Mongoose model for user data
const Admin = mongoose.model('admins', adminSchema);

module.exports = Admin;