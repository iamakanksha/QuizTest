const express = require('express')
const app = express()
const drive_question = require('../models').drive_question;
const user_question = require('../models').user_question;
const user_test=require('../models').user_test;
const question_bank=require('../models').question_bank;
const bodyParser= require('body-parser')
const router= express.Router()
var path = require('path')
app.use('/cssFiles', express.static(__dirname + '/views/css/'));

router.get('/submitAnswer/:qid/:tid/:uid/:answer_marked' ,function (req, res) {
  
  question_bank.findOne({
    attributes:['correct_option'],
    where:{
        qid:req.params.qid,
    }
  }).then(function(answer){
      var is_really_correct;
      if(answer.correct_option==req.params.answer_marked)
        is_really_correct=true;
      else
        is_really_correct=false;

      user_question.update({answer_marked:req.params.answer_marked,is_correct:is_really_correct}, {
          where: {
            qid: req.params.qid,
            tid: req.params.tid,
            uid: req.params.uid
          }
      })
  })
})

router.get('/resetAnswer/:qid/:tid/:uid' ,function (req, res) {
    
    user_question.update({answer_marked:null,is_correct:null}, {
        where: {
          qid: req.params.qid,
          tid: req.params.tid,
          uid: req.params.uid
        }
      }).then();
    
})

module.exports=router
