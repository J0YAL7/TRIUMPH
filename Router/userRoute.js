const express = require('express');
const router = express.Router();
const User = require('../models/userSchema/userSchema'); // Import the User schema/model
const userController = require('../controllers/userController');





// Route to handle user signup
// userRouter.get('/userprofile/:id',userProductController.userProfile)
// router.get('/signup',userController.signupForm)
// router.post('/signup',userController.signuphandle)
// router.get('/signup-otp',userController.showOtp)
// router.post('/signup-otp',userController.OTPverification)
// router.post('/resendOTP',userController.resendOTP)
router.post('/signup1',userController.userSignup);
router.get('/',userController.getSignup)
router.get('/getOtpPage',userController.getOtp);
module.exports = router;
