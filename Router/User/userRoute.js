    const express = require('express');
    const router = express.Router();
    const User = require('../../models/userSchema/userSchema'); // Import the User schema/model
    const userController = require('../../controllers/UserControllers/userController');
    const bodyParser = require('body-parser');
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({extended:true}))




    // Route to handle user signup
    router.get('/',userController.getSignup)
    router.get('/userLogin',userController.getlogin);
    router.post('/signup1',userController.userSignup);
    router.get('/otp',userController.getOtp);
    router.get('/home',userController.gethome);
    router.get('/productDetails',userController.getproductDetails);
    router.get('/shoppingCart',userController.getshoppingCart);
    router.get('/about',userController.getAbout);
    router.get('/contact',userController.getContact);

    // New route for OTP verification
    router.post('/verifyotp', userController.verifyOtp);


    module.exports = router;
