const express = require('express')
const app = express()
const college = require('../models').college;
const bodyParser= require('body-parser')
var md5=require('blueimp-md5')
const router= express.Router()
const alert=require('alert-node')
//app.set('view engine', 'ejs')

var path = require('path')
// app.use(bodyParser())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use('/cssFiles', express.static(__dirname + '/views/css/'));
// app.set('../views', path.join(__dirname, 'views/layouts/'));
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
    
})
router.get('/addCollege', function (req, res) {
    if(req.session.user && req.cookies.user_sid){
        //prevents returning on back button press
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render('layouts/addCollege',{ list: l })
        }
        else{
            res.redirect('/adminlogin')
        }
})
router.post('/addCollege' ,function (req, res) {
    college.findOne({
        attributes:['cid'],
        where:{
            college_name:req.body.college_name,
        }
    }
    ).then(college_found=>{
    if(!college_found){
    return college.create({
        college_name:req.body.college_name,
    }).then(function (college) {
        if (college) {
            res.redirect('/addCollege');
        } else {
            res.status(400).send('Error in insert new record');
        }
    });
    }
    else{
        res.status(200);
        alert('College already exists!!');
        res.redirect('/addCollege');
    }
})

})

module.exports=router
