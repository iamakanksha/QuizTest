const express = require('express')
const app = express()
const bodyParser= require('body-parser')
const college = require('../models').college;
var md5=require('blueimp-md5')
const router= express.Router()

var path = require('path')


router.get('/adminlogin', function (req, res) {
    

    res.render('layouts/adminlogin',{})
})
router.post('/adminlogin' ,function (req, res) {
    if( req.body.adminemail=="admin@practest.com" && req.body.adminpassword=="password"){
        req.session.user=req.body.adminemail;
        res.redirect('/adminLandoverPage')
    }
    else{
        res.redirect('/adminlogin')

    }
    
});
router.get('/adminLandoverPage',function(req,res){
    if(req.session.user && req.cookies.user_sid){
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render('layouts/adminLandoverPage')
    }
    else{
        res.redirect('/adminlogin');
    }
});
module.exports=router


  