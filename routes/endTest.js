const express = require('express')
const app = express()
const bodyParser= require('body-parser')
var cookieParser=require('cookie-parser')
var session=require('express-session')
var path = require('path')
var morgan=require('morgan')
const user_question = require('../models').user_question;
const user_test=require('../models').user_test;
const alert=require('alert-node')
const router= express.Router()
var path = require('path')
app.use('/cssFiles', express.static(__dirname + '/views/css/'));
router.get('/endTest/:tid',(req,res)=>{
    if(req.session.user && req.cookies.user_sid){
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        //compute score of the user who appeared for 'tid'
        var no_of_correct=0;
        var no_of_wrong=0;
        var user_score=0;
        //no of correct responses sent
        const promise1=
        user_question.findAndCountAll({
            attributes:['is_correct'],
            where: {
                tid:req.params.tid,    
                uid:req.session.user.uid,
                is_correct:true
            },
        });
        const promise2=promise1.then(function(result) {
            no_of_correct=result.count;
            console.log(no_of_correct);
        });
        
        //no of incorrect responses sent
        const promise3=
        user_question.findAndCountAll({
            attributes:['is_correct'],
            where: {
                tid:req.params.tid,    
                uid:req.session.user.uid,
                is_correct:false
            },
        });
        const promise4=
        promise3.then(function(result) {
            no_of_wrong=result.count;
            console.log(no_of_wrong);
        });
        const promise5=
        promise4.then(function(result){
            user_score=no_of_correct-no_of_wrong;
            console.log(user_score);
        })
        const promise6=
        promise5.then(()=>{user_test.update({score:user_score},
            {
                where:{
                    tid:req.params.tid,    
                    uid:req.session.user.uid,
                }
            })
        })
        Promise.all([promise1,promise2,promise3,promise4,promise5,promise6]).then(()=>{
            res.clearCookie('user_sid')

            req.session.destroy((err) => {
                if(err) {
                    return console.log(err);
                }
                else{
                    res.render('layouts/endTest');
                }
            });
        })
        
    }else{
        res.redirect('/studentLogin')
    }
})

module.exports=router
