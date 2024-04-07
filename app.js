const express = require('express');
const MongoDB = require('./models/database')
const app = express();
const PORT = 5000;
const router = require('./Router/userRoute')
const bodyParser = require('body-parser');

// Set EJS as the view engine
app.set('view engine', 'ejs');
MongoDB();

app.get('/', (req, res) => {
    res.render('landingPage');
  });
  
// Route to serve the signup form
app.get('/signup', (req, res) => {
    res.render('userSignup');
});

app.get('/Home',(req,res)=>{
    res.render('home')
});
app.use(bodyParser.json());

// Parse URL-encoded bodies for POST requests
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });




