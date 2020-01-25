const express = require('express')
const app = express()
const bodyParser= require('body-parser')
var cookieParser=require('cookie-parser')
var session=require('express-session')
var path = require('path')
var morgan=require('morgan')
const alert=require('alert-node')

app.use(cookieParser());
app.use(session({
    key:'user_sid',
    secret:'iamironman',
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:60000
    } 
}));


app.set('view engine', 'ejs')
app.use(bodyParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/cssFiles', express.static(__dirname + '/views/css/'));
app.set('/views', path.join(__dirname, 'views/layouts/'));
app.use( express.static( "public" ) );

//session is created in app.js
app.use((req,res,next)=>{
    if(req.cookies.user_sid && !(req.session.user)){
        res.clearCookie('user_sid');
    }
    next();
})



//home page
const home =require("./routes/home.js")
app.use(home)
//addig a question 
const addquestion=require("./routes/addQuestion.js")
app.use(addquestion)
//pretest
const pretest=require("./routes/preTest.js")
app.use(pretest)

//taking test
const takingtest=require("./routes/takingTest.js")
app.use(takingtest)
//logout 
const logOut=require("./routes/logout.js")
app.use(logOut)
// student registration page
const router=require("./routes/studentRegistration.js")
app.use(router)
//submit answer
const submitanswer=require("./routes/submitAnswer.js")
app.use(submitanswer)
// add test page
const addTest=require("./routes/addtest.js")
app.use(addTest)

const addcollege=require("./routes/addCollege.js")
app.use(addcollege)

const studentlogin=require("./routes/studentLogin.js")
app.use(studentlogin)



//admin login route
const adminlog=require("./routes/adminlogin.js")
app.use(adminlog)

app.listen(3000, () => console.log(`server started`))