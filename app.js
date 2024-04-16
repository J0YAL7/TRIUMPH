const express = require('express');
const MongoDB = require('./database')
const path=require('path')
const app = express();
const PORT = 5000;
const router = require('./Router/userRoute');
const bodyParser = require('body-parser');
MongoDB();


app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Set EJS as the view engine
app.set('view engine','ejs');
app.use(router)



  








app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });