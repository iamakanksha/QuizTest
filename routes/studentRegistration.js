const express = require('express')
const app = express()
const college = require('../models').college;
const user = require('../models').user;
const bodyParser= require('body-parser')
var md5=require('blueimp-md5')
const router= express.Router()
//app.set('view engine', 'ejs')
const alert=require('alert-node')
var path = require('path')


router.get('/studentRegistration', function (req, res) {
    var l=[]
    var col
    college.findAll({
        attributes: ['cid','college_name']
    }).then(college =>{
        //received a json object
        col=(JSON.parse(JSON.stringify(college)))
        col.map(function(item){
            l.push([item.cid,item.college_name])
        })
        //console.log(l);
        
    }).then(()=>{
        res.render('layouts/studentRegistration',{ list: l })

    })
})
router.post('/studentRegistration' ,function (req, res) {
    user.findOne({
        attributes:['emailid'],
        where:{
            emailid:req.body.emailid,
        }
    }
    ).then(user_found=>{
    if(!user_found){
    user.create({
        uname:req.body.uname,
        emailid:req.body.emailid,
        dob:req.body.dob,
        phoneno:req.body.phoneno,
        degree:req.body.degree,
        cid:req.body.cid,
        upassword:md5(req.body.upassword)
    }).then(function (user) {
        if (user) {
            res.status(200)
            alert("Registration complete.Log in to take the test")
            res.redirect('/studentLogin');
        } else {
            res.status(400).send('Error in insert new record');
        }
    }).catch((err)=>{
        res.redirect('/studentRegistration')
    })
    //end of if
    }
    else{
        res.status(200);
        alert("You have already registered with this email address. Sign in to take the test!");
        res.redirect('/studentLogin');
    }
})
    
})

module.exports=router
