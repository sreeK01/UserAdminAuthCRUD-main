const express = require("express");
const app = express();
const path = require("path");
const hbs = require ('hbs')
const userCollection=require('./dbConfig/userDb')
const adminCollection=require('./dbConfig/adminDb')
const session=require('express-session')
const nocache=require('nocache')
var fileUpload = require('express-fileupload')
var cookieParser = require('cookie-parser');
const tempelatePath=path.join(__dirname,'/tempelates')
const userRoute = require('./routes/user')
const adminRoute = require('./routes/admin')


app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','hbs')
app.set('views',tempelatePath)
app.use(express.urlencoded({extended:false}))
app.use(fileUpload())
app.use(cookieParser()) 





app.use(session({
    secret:"keyboard cat",
    resave:true,
    saveUninitialized:false,
    cookie:{
      sameSite:'strict',
      maxAge:60*1000*60
    }
  }))  
app.use(nocache())

// // check if session is set or not 
// app.use((req, res, next) => {
//     if (req.session && req.session.user) {
//         next()
//     } else {
//         res.redirect('/')
//     }
// })
  




app.use('/',userRoute)
app.use('/',adminRoute)








app.listen(5000, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log('Server is running on port 5000');
    }
});