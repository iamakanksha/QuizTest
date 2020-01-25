const express = require('express')
const app = express()
const bodyParser= require('body-parser')
const college = require('../models').college;
var md5=require('blueimp-md5')
const router= express.Router()
//const flash=require('req-flash')
//app.set('view engine', 'ejs')
//app.use(flash())
//req.flash('alert');
var path = require('path')
// app.use(bodyParser())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use('/cssFiles', express.static(__dirname + '/views/css/'));
// app.set('../views', path.join(__dirname, 'views/layouts/'));

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
    
        //req.flash('alert','fghfh')
        //res.redirect('/adminlogin')
        
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


  