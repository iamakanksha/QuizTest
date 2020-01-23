const express=require('express')
const app = express()
const sequelize=require('sequelize')
var path=require('path')
var cookieParser=require('cookie-parser')
var session=require('express-session')
var bodyParser=require('body-parser')
var morgan=require('morgan')
const user = require('../models').user;
var md5=require('blueimp-md5')
const router= express.Router()

// //session is created in app.js
// app.use((req,res,next)=>{
//     if(req.cookies.user_sid && !(req.session.user)){
//         res.clearCookie('user_sid');
//     }
//     next();
// })
var ejsContent={userName:'',loggedin:false,title:"not logged in",uid:"",cid:""}


router.get('/studentLogin',(req,res)=>{ 
    res.render("layouts/studentLogin",{ejsContent})
})

router.post('/studentLogin',(req,res)=>{
    var emailid=req.body.emailid
    var upassword=md5(req.body.upassword)
    user.findOne({
        attributes:['emailid','upassword','uid','cid'],
        where:{
            emailid:emailid,
            upassword:upassword
        }
    }).then(function(user){
        if(!user){
            res.redirect('/studentLogin');
        }else{
            //console.log(user.dataValues);
            
            req.session.user=user.dataValues;
            res.redirect('/preTest')
        }
    })
})
    
module.exports=router


  