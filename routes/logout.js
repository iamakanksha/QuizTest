const express = require('express')
const app = express()
const bodyParser= require('body-parser')
const college = require('../models').college;
var md5=require('blueimp-md5')
const router= express.Router()
var path = require('path')

router.get('/logout',(req,res)=>{
    if(req.session.user && req.cookies.user_sid){
        res.clearCookie('user_sid')
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            res.redirect('/');
        });
    }else{
        res.redirect('/adminlogin')
    }
})

module.exports=router

