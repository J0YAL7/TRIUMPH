const express = require('express');
const session = require('express-session');
const MongoDB = require('./database')
const path=require('path')
const app = express();
const PORT = 5000;
const router = require('./Router/User/userRoute');
const adminRoutes = require('./Router/Admin/adminRoute');
const bodyParser = require('body-parser');
const bcrypt=require('bcrypt')
MongoDB();

// Use express-session middleware
app.use(session({
  secret: 'jovscode',
  resave: false,
  saveUninitialized: false
}));

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine','ejs');

app.use(router)
app.use(adminRoutes)



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });


  