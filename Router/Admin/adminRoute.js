const express = require('express');
const router = express();
const Admin = require('../../models/adminSchema/adminSchema'); // Import the Admin schema/model
const adminController = require('../../controllers/AdminControllers/adminController');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}))


router.get('/adminlogin',adminController.getlogin);
router.get('/adminHome',adminController.getAdminHome);
router.post('/Adminlogin',adminController.postadminlogin);


module.exports = router;