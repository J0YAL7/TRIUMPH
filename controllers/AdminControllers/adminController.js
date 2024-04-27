const Admin = require('../../models/adminSchema/adminSchema'); // Import the User schema/model
const adminController = {};
const bcrypt=require('bcrypt')



adminController.getlogin=async(req,res)=>{
    res.render('Adminviews/adminlogin')
}

// Function to render the Home page
adminController.getAdminHome = async (req, res) => {
    res.render('Adminviews/adminHome');
  };

  adminController.postadminlogin=async(req,res)=>{
    try {
                const {email,password}=req.body;
                console.log(email);
                console.log(password);
                
              
                const newUser = new Admin({
                    email: email,
                    password: password
                });
                // await newUser.save();
        
                if (newUser) {
                  res.render('Adminviews/adminHome');
                } else {
                 console.log("data is not getting");
                }
            } catch (error) {
                console.error(error);
               
            }
        
  }

  module.exports = adminController;