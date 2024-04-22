// Import required modules
const nodemailer = require("nodemailer");
const User = require('../../models/userSchema/userSchema'); // Import the User schema/model
const {sendOtpEmail} = require('../emailService'); // Import the sendOtpEmail function
const bcrypt = require('bcrypt');

const securePassword = async(password)=>{
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;

  } catch (error) {
    console.log(error.message)  ;
  }
}

const userController = {};

// Function to generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Function to handle user signup
userController.userSignup = async (req, res) => {
  console.log("Hello");
  console.log("User Signup Request Body:", req.body);

  const { name, mobile, email, password } = req.body;

  try {
    const spassword = await securePassword(req.body.password);
    // Create a new user document
    const newUser = new User({
      name:req.body.name,
      mobile:req.body.mobile,
      email:req.body.email,
      password:spassword,
      is_admin:0
    });

    // Save the user document to the database
    await newUser.save();

    console.log('User created successfully.');

    // Generate OTP
    const otp = generateOTP();
    console.log(`Your OTP is ${otp}`);

    // Store the OTP in the session for OTP verification
    req.session.otp = otp;

    // Send OTP email to the user
    await sendOtpEmail(email, otp);
     
    

    // Redirect the user to the OTP page
    res.redirect('/getOtpPage');
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Function to render the signup form
userController.getSignup = async (req, res) => {
  res.render('Userviews/landingPage');
};
userController.getlogin=async(req,res)=>{
  res.render('Userviews/userSignup')
}

// Function to render the OTP page
userController.getOtp = async (req, res) => {
  res.render('Userviews/otp');
};

// Function to render the Home page
userController.gethome = async (req, res) => {
  res.render('Userviews/home');
};

// Function to render the Product Details page
userController.getproductDetails = async (req, res) => {
  res.render('Userviews/productDetails');
};

// Function to render the Shopping Cart page
userController.getshoppingCart = async (req, res) => {
  res.render('Userviews/shoppingCart');
};

// Function to render the About page
userController.getAbout = async (req, res) => {
  res.render('Userviews/about');
};

// Function to render the Contact page
userController.getContact = async (req, res) => {
  res.render('Userviews/contact');
};

// Function to verify the entered OTP
userController.verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const storedOtp = req.session.otp; // Retrieve the stored OTP from the session

  if (otp === storedOtp) {
    // If OTP is valid, redirect the user to a success page
    res.render('otpSuccess'); // Create otpSuccess.ejs for the success page
  } else {
    // If OTP is invalid, display an error message
    res.render('otpError'); // Create otpError.ejs for the error page
  }
};

module.exports = userController;