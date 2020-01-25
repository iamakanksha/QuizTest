const express = require('express')
const app = express()
const bodyParser= require('body-parser')
const question_bank= require('../models').question_bank;
var md5=require('blueimp-md5')
const router= express.Router()
//app.set('view engine', 'ejs')

var path = require('path')
// app.use(bodyParser())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use('/cssFiles', express.static(__dirname + '/views/css/'));
// app.set('../views', path.join(__dirname, 'views/layouts/'));
router.get('/addQuestion', function (req, res) {
    if(req.session.user && req.cookies.user_sid){
        //prevents returning on back button press
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render('layouts/addQuestion')
        }
        else{
            res.redirect('/adminlogin')
        }
})
router.post('/addQuestion' ,function (req, res) {
    console.log(req.body.correct_option)
    return question_bank.create({
        question:req.body.question,
        option1:req.body.option1,
        option2:req.body.option2,
        option3:req.body.option3,
        option4:req.body.option4,
        correct_option:req.body.correct_option,
        level:req.body.level
    }).then(function (question_bank) {
        if (question_bank) {
            res.status(200)
            res.redirect('/addQuestion')
        } else {
            res.status(400).send('Error in insert new record');
        }
    });
    
})

module.exports=router
