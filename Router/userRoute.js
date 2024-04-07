const express = require('express');
const router = express.Router();
const User = require('../models/userSchema'); // Import the User schema/model
const userController = require('../controllers/userController');

// Route to handle user signup
router.post('/signup',userController.userSignup);

module.exports = router;
