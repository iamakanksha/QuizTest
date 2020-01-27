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

router.get('/preTest',(req,res)=>{

    if(req.session.user && req.cookies.user_sid){

        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'); 
        //find an active drive to be assigned to the user
        drive_test.findOne({
            attributes:['tid'],
            where:{
                cid:req.session.user.cid,
                is_active:"active"
            }
        }).then(function(theDrive){
            user_test.findOne({
                attributes:['score'],
                where:{
                    tid:theDrive.tid,
                    uid:req.session.user.uid
                }
            }).then((userscore)=>{
                //checking if user has already given the test
                if(!userscore||userscore.score==null){
                    res.render("layouts/preTest",{userName:req.session.user.emailid,cid:req.session.user.cid,tid:theDrive.tid,uid:req.session.user.uid})
                }
                else{
                    res.clearCookie('user_sid')

                    req.session.destroy((err) => {
                        if(err) {
                            return console.log(err);
                        }
                        else{
                            res.render('layouts/endTest');
                        }
                    });
                }       
            })
            
        }).catch((err)=>{
            res.redirect('/studentLogin')
        })
    }
    else{
        res.redirect('/studentLogin')
    }
})
//fetching questions for the user
router.get('/getFetchPopulate',(req,res)=>{
    if(req.session.user && req.cookies.user_sid){
        drive_test.findOne({
            attributes:['tid'],
            where:{
                cid:req.session.user.cid,
                is_active:"active"
            }
        }).then(function(myDrive){
            
            user_test.findOne({
                attributes:['uid','tid'],
                where:{
                    uid:req.session.user.uid,
                    tid:myDrive.tid
                }
            })
            .then(function(mineDrive){
                
                if(!mineDrive){
                    user_test.create({
                        uid:req.session.user.uid,
                        tid:myDrive.tid,
                        uname:req.session.user.uname,
                        emailid:req.session.user.emailid,

                    }).then(function(mineDrive){
                        drive_question.findAll({
                            attributes:['qid'],
                            where:{
                                tid:mineDrive.tid
                            }
                        }).then((myQuestions)=>{
                            myQuestions.forEach(key=>{
                                user_question.create({
                                    uid:req.session.user.uid,
                                    tid:mineDrive.tid,
                                    qid:key.qid,
                                    answer_marked:null,
                                    is_correct:null
                                    
                                })
                                
                            })
                        }).then(()=>{
                            res.send(200)
                        })
                    })
                }
                else{
                    console.log("You have logged in before")
                    res.send(200)
                }
            })
        })
    }
    else{
        res.redirect('/studentLogin')
    }
})
module.exports=router