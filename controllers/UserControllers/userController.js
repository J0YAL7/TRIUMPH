// Import required modules
const nodemailer = require("nodemailer");
const User = require('../../models/userSchema/userSchema'); // Import the User schema/model
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
    

 

    // Send OTP email to the user
    await emailVerification(email,req,res);
        
   
    

    // Redirect the user to the OTP page
    res.redirect('/getOtpPage');
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

let otpVal;
    const emailVerification = async (email,req,res)=>{
      try{ 
        console.log("Sucsess");
          const otpVal = generateOTP();
          req.session.otp=otpVal
          console.log(`Your OTP is ${otpVal}`);
          const transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
              secure: false,
              requireTLS: true,
              auth: {
                user:"jax0eagle@gmail.com",
                pass:"nlcs look ejki gpej",
              },
              tls: {
                rejectUnauthorized: false,
              },
            });
        
            let mailOptions = {
              from:"jax0eagle@gmail.com",
              to: email,
              subject: " Welcome to TRIUMPH - Verify Your Account",
              text:`Dear Fitness Lover,
              
              Thank you for choosing TRIUMPH for your fitness needs. We're thrilled to have you join our community!
              To complete your signup process, please use the following OTP (One-Time Password) to verify your identity:
              
              OTP: ${otpVal}
              
              Please use this code within the next [time period] minutes to verify your account.
              If you did not request this verification, please disregard this email.
              If you have any questions or need assistance, feel free to reach out to our support team 
              We're excited to accompany you on your fitness journey!
              
              Best regards,
              The TRIUMPH Team`
              
            };
            let info = await transporter.sendMail(mailOptions);
            console.log("Email sent:", info.response);
          }catch (error){
            console.error("Email sending failed:", error);
      }
  };

// Function to render the signup form
userController.getSignup = async (req, res) => {
  res.render('Userviews/landingPage');
};
userController.getlogin=async(req,res)=>{
  res.render('Userviews/userSignup')
}

userController.verifyLogin= async(req,res)=>{
  console.log("Verified")

  const email = req.body.email
  const pass = req.body.pass
  
  const userData = await User.findOne({ email:email })
  const passwordMatch = await bcrypt.compare(pass,userData.password);
  console.log(userData.password);
  console.log(passwordMatch);
  if(userData && passwordMatch){
    console.log("Login Completed")
      res.redirect('/home')
             
   } else{
    res.send(`
    <script>
      alert('Wrong email or password');
      window.location.href = '/userLogin';
    </script>
  `);
      }
  
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
  const otp = req.body.otp;
  const storedOtp =req.session.otp; 
  console.log("from frontend",otp);
  console.log("from session",storedOtp);
  if(otp==storedOtp){
    console.log("Signup Completed");
    res.json({success:true,message:"successFully getting otp"})
  } else {
    res.json({success:false,message:"Not getting otp"})
  }
};

module.exports = userController;