const express = require('express')
const app = express()
const college = require('../models').college;
const bodyParser= require('body-parser')
var md5=require('blueimp-md5')
const router= express.Router()
// const flash=require('express-flash')
// router.use(flash())
const alert=require('alert-node')

var path = require('path')

router.get('/addCollege', function (req, res) {
    if(req.session.user && req.cookies.user_sid){
        //prevents returning on back button press
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render('layouts/addCollege')
        }
        else{
            res.redirect('/adminlogin')
        }
})
router.post('/addCollege' ,function (req, res) {
    college.findOne({
        attributes:['cid'],
        where:{
            college_name:req.body.college_name
        }
    }
    ).then(college_found=>{
    if(!college_found){
    return college.create({
        college_name:req.body.college_name.toUpperCase(),
    }).then(function (college) {
        if (college) {
            res.redirect('/addCollege');
        } else {
            res.status(400).send('Error in insert new record');
        }
    }).catch((err)=>{
        res.redirect('/addCollege')
    })
    }
    else{
        res.status(200);
        //alert('College already exists!!');
        // req.flash('error','College already exists!!')
        res.redirect('/addCollege');
    }
})
})

module.exports=router
