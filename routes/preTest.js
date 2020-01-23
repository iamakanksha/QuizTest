const express=require('express')
const app = express()
const sequelize=require('sequelize')
var path=require('path')
var cookieParser=require('cookie-parser')
var session=require('express-session')
var bodyParser=require('body-parser')
var morgan=require('morgan')
const user = require('../models').user;
const user_test = require('../models').user_test;
const user_question = require('../models').user_question;
const drive_question = require('../models').drive_question;
const drive_test = require('../models').drive_test;

var md5=require('blueimp-md5')
const router= express.Router()

var ejsContent={userName:'',loggedin:false,title:"not logged in",uid:"",cid:"",tid:""}


router.get('/preTest',(req,res)=>{
    
    if(req.session.user && req.cookies.user_sid){
        ejsContent.loggedin=true;
        ejsContent.userName=req.session.user.emailid;
        ejsContent.title="use are logged in"
        ejsContent.cid=req.session.user.cid;
        ejsContent.uid=req.session.user.uid;
        drive_test.findOne({
            attributes:['tid'],
            where:{
                cid:req.session.user.cid,
                is_active:"active"
            }
        }).then(function(theDrive){
            
            ejsContent.tid=theDrive.tid;
            // console.log(theDrive);

            
        }).then(()=>{
            res.render("layouts/preTest",{ejsContent})  
        })
        
        
        
        
    }
    else{
        res.redirect('/studentLogin')
    }
})
router.get('/getFetchPopulate',(req,res)=>{
    
    drive_test.findOne({
        attributes:['tid'],
        where:{
            cid:ejsContent.cid,
            is_active:"active"
        }
    }).then(function(myDrive){

        user_test.findOne({
            attributes:['uid','tid'],
            where:{
                uid:ejsContent.uid,
                tid:myDrive.tid
            }
        })
        .then(function(mineDrive){

            if(!mineDrive){
                user_test.create({
                    uid:ejsContent.uid,
                    tid:myDrive.tid
                }).then(function(mineDrive){
                    drive_question.findAll({
                        attributes:['qid'],
                        where:{
                            tid:mineDrive.tid
                        }
                    }).then((myQuestions)=>{
                        myQuestions.forEach(key=>{
                            user_question.create({
                                uid:ejsContent.uid,
                                tid:mineDrive.tid,
                                qid:key.qid,
                                answer_marked:null,
                                is_correct:null
                                
                            })
                            
                        })
                    })
                })
            }
            else{
                console.log("You have logged in before")
            }
        })
    })
})


module.exports=router
