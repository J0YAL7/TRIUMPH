const User = require('../models/userSchema/userSchema'); // Import the User schema/model
const userController = {}


userController.userSignup =  async (req, res) => {
  console.log("hello");
  console.log("Hi",req.body);
    const {name,mobile, email, password} = req.body;
    
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
      res.status(201).json({ success:true , message: 'User created successfully' });
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Failed to create user' });
    }
  };
  userController.getSignup=async(req,res)=>{
    res.render('userSignup')  
  }
  userController.getOtp=async(req,res)=>{
    res.render('otp')
  }
  module.exports = userController