const express = require('express');
const MongoDB = require('../TRUIMPH/database'); 
const app = express();
const PORT = 5000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
MongoDB();


// Route to serve the signup form
app.get('/signup', (req, res) => {
    res.render('userSignup');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });




