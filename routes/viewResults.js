const sequelize=require('sequelize')
const express = require('express')
const app = express()
const college = require('../models').college;
const user_test= require('../models').user_test;
const drive_test=require('../models').drive_test;
const router= express.Router()
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const bodyParser= require('body-parser')
var path = require('path')
app.use(bodyParser())

router.get('/viewResults',(req,res)=>{
    if(req.session.user && req.cookies.user_sid){
        //fetching colleges
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
        }).then(()=>{
            //prevents returning on back button press
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            res.render('layouts/viewResults',{ list: l })
        }).catch((err)=>{
            res.redirect('/adminlogin')
        })
        }
        else{
            res.redirect('/adminlogin')
        }
})


router.get('/fetchCollegeResults/:cid',(req,res)=>{
    if(req.session.user && req.cookies.user_sid){
        drive_test.findOne({
            attributes:['tid'],
            where:{
                cid:req.params.cid,
                is_active:"active"
            }
        }).then(function(myDrive){
            if(myDrive){
            user_test.findAll({
                attributes:['uname','emailid','score'],
                where:{
                    tid:myDrive.tid
                },
                order:[
                    ['score','DESC']
                ],
            }).then(function (userscores){
                res.send(userscores);
            })
            .catch((err)=>{
                res.redirect('/viewResults')
            })
        }
        else{
            res.redirect('/viewResults')
        }
        })
        
    }
    //if no session
    else{
        res.redirect('/adminlogin')
    }
//end of get
})

module.exports=router 