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

var l=[];  
router.get('/takingTest/:uid/:tid', (req,res)=>{

user_question.findAll({
  attributes: ['qid'],
  where:{
    uid:req.params.uid,
    tid:req.params.tid,

  }
  
}).then( (questions)=> {
    
    questions.forEach(key=>{
      //console.log(key)
        question_bank.findAll({
            attributes: ['qid','question','option1','option2','option3','option4'],
            where:{
              qid:key.qid
              
            }
        }).then(myquestion =>{
          
          
          var col
          col=(JSON.parse(JSON.stringify(myquestion)))
              col.map(function(item){
                l.push([item.qid,item.question,item.option1,item.option2,item.option3,item.option4,req.params.uid,req.params.tid])
              })

        })
        //print here
  }
  )
  
})
.then(function(response){
  console.log("query exexuted");
  res.render('layouts/takingTest',{list:l})
})
    //checking for questions chosen for a drive
    //console.log(l);   
    //res.render('layouts/takingTest',{list:l})
})


//end og get
module.exports=router