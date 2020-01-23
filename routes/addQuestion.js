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
    
  res.render('layouts/addQuestion',{ })
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
            res.send(question_bank);
        } else {
            res.status(400).send('Error in insert new record');
        }
    });
    
})

module.exports=router
