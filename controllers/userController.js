const User = require('../models/userSchema'); // Import the User schema/model
const userController = {}


userController.userSignup =  async (req, res) => {
    const { name, mobile, email, password } = req.body;
      console.log("Hii",req.body);
    try {
      // Create a new user document
      const newUser = new User({
        name,
        mobile,
        email,
        password
      });
  
      // Save the user document to the database
      await newUser.save();
  
      console.log('User created successfully.');
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Failed to create user' });
    }
  };
  module.exports = userController