const express = require('express')
const app = express()
const drive_question = require('../models').drive_question;
const user_question = require('../models').user_question;
const user_test=require('../models').user_test;
const question_bank=require('../models').question_bank;
const bodyParser= require('body-parser')
var cookieParser=require('cookie-parser')
var session=require('express-session')

const router= express.Router()
var path = require('path')
app.use('/cssFiles', express.static(__dirname + '/views/css/'));


router.get('/takingTest/:uid/:tid', (req,res)=>{
  
  
  if(req.session.user && req.cookies.user_sid){
    user_question.findAll({
      attributes: ['qid'],
      where:{
        uid:req.params.uid,
        tid:req.params.tid,
        
      }
      
    }).then( (questions)=> {
      res.render('layouts/takingTest',{qid_json:questions,cid:req.session.user.cid,uid:req.session.user.uid,userName:req.session.user.emailid,tid:req.params.tid})
    })
  }
  else{
    res.redirect('/studentLogin');
  }
}) 


router.get('/question/:qid',(req,res)=>{
  question_bank.findAll({
    attributes: ['qid','question','option1','option2','option3','option4'],
    where:{
      qid:req.params.qid
    }
  }).then((question)=>{
    
    res.send(question)
  })
})
router.get('/answer/:qid',(req,res)=>{
  user_question.findOne({
    attributes:['answer_marked'],
    where:{qid:req.params.qid}
  }).then((answer)=>{
    res.send(answer.answer_marked)
  })
})

module.exports=router