const express = require('express')
const app = express()
const college = require('../models').college;
const user = require('../models').user;
const bodyParser= require('body-parser')
var md5=require('blueimp-md5')
const router= express.Router()
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


router.get('/studentRegistration', function (req, res) {
    

  res.render('layouts/studentRegistration',{ list: l })
})
router.post('/studentRegistration' ,function (req, res) {
    //console.log(req.body.uname)
    return user.create({
        uname:req.body.uname,
        emailid:req.body.emailid,
        dob:req.body.dob,
        phoneno:req.body.phoneno,
        degree:req.body.degree,
        cid:req.body.cid,
        upassword:md5(req.body.upassword)
    }).then(function (user) {
        if (user) {
            res.redirect('/studentLogin');
        } else {
            res.status(400).send('Error in insert new record');
        }
    });
    
})

module.exports=router
