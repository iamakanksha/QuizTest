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
})

router.get('/viewResults',(req,res)=>{
    if(req.session.user && req.cookies.user_sid){
        //prevents returning on back button press
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render('layouts/viewResults',{ list: l })
        }
        else{
            res.redirect('/adminlogin')
        }
})


router.post('/fetchCollegeResults',(req,res)=>{
    if(req.session.user && req.cookies.user_sid){
        
        var csvWriter = createCsvWriter({
            path: './public/out.csv',
            header: [
              {id: 'uname', title: 'Name'},
              {id: 'score', title: 'Score'},
            ]
        });

        const promise1=
        drive_test.findOne({
            attributes:['tid'],
            where:{
                cid:req.body.cid,
                is_active:"active"
            }
        });
        const promise2=promise1.then(function(myDrive){
            console.log("mydrive:"+myDrive.tid+"\n")
            user_test.findAll({
                attributes:['uid','score'],
                where:{
                    tid:myDrive.tid
                }
            }).then(function(userscores){
                console.log(userscores)
                userscores.forEach((key)=>{
                    var data = [
                        {
                          uname: key.uid,
                          score: key.score,
                          
                        }
                    ];
                    csvWriter.writeRecords(data)

                })   
            });

        });
        
            Promise.all([promise1,promise2]).then(()=>{
                res.sendFile('public/out.csv');
            
            });
        
    }
    //if no session
    else{
        res.redirect('/adminlogin')
    }
//end of get
})

module.exports=router 