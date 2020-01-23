const sequelize=require('sequelize')
const express = require('express')
const app = express()
const college = require('../models').college;
const drive_test = require('../models').drive_test;
const drive_question = require('../models').drive_question;
const question_bank = require('../models').question_bank;
const bodyParser= require('body-parser')

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

router.get('/addtest', function (req, res) {
  res.render('layouts/addtest',{ list: l })
})
router.post('/addtest' ,function (req, res) {    
//console.log(req.body.cid)
//setting other tid for that college to inactive, if exists
drive_test.update({ is_active: "inactive" }, {
    where: {
      cid: req.body.cid,
      is_active: "active"
    }
  }).then(function(new_test){

//inserting a row in drive_test
    drive_test.create({
        cid:req.body.cid,
        easy:req.body.easy,
        medium:req.body.medium,
        hard:req.body.hard,
        test_date:req.body.test_date,
        is_active:"active",
          
        }).then(function (drive_test) {
            if (drive_test) {
            //fetching tid of the recently entered row
            //console.log(drive_test.tid)
            
            //fetching easy questions
                question_bank.findAll({ 
                    attributes: ['qid'],
                    order: sequelize.literal('rand()'), 
                    limit: parseInt(req.body.easy),
                    where:{
                        level: "easy"
                    }
                }).then( (easy_questions)=> {
                    easy_questions.forEach(key=>{
                        drive_question.create({
                            tid: drive_test.tid,
                            qid:key.qid
                        })
                    })
                    //console.log(easy_questions)  
                });
                //end of one set

                //fetching medium questions
                question_bank.findAll({ 
                attributes: ['qid'],
                order: sequelize.literal('rand()'), 
                limit: parseInt(req.body.medium),
                where:{
                    level: "medium"
                }
            }).then( (medium_questions)=> {
                medium_questions.forEach(key=>{
                    drive_question.create({
                        tid: drive_test.tid,
                        qid:key.qid
                    })
                })
                //console.log(medium_questions)  
            });
            //end of one set

            //fetching hard questions
            question_bank.findAll({ 
                attributes: ['qid'],
                order: sequelize.literal('rand()'), 
                limit: parseInt(req.body.hard),
                where:{
                    level: "hard"
                }
            }).then( (hard_questions)=> {
                hard_questions.forEach(key=>{
                    drive_question.create({
                        tid: drive_test.tid,
                        qid:key.qid
                    })
                })
                //console.log(hard_questions)  
            });
            //end of one set
                
                    

                } else {
                    res.status(400).send('Error in insert new record');
                }
                res.send(drive_test);
        });
        //end of drive test inseert
    })
    
})

module.exports=router
