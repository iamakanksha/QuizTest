const express = require('express')
const app = express()
const bodyParser= require('body-parser')
var md5=require('blueimp-md5')
const router= express.Router()
//const flash=require('req-flash')
//app.set('view engine', 'ejs')
//app.use(flash())
//req.flash('alert');
var path = require('path')
// app.use(bodyParser())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use('/cssFiles', express.static(__dirname + '/views/css/'));
// app.set('../views', path.join(__dirname, 'views/layouts/'));

router.get('/adminlogin', function (req, res) {
    

    res.render('layouts/adminlogin',{})
})
router.post('/adminlogin' ,function (req, res) {
    if( req.body.adminemail=="admin@practest.com" && req.body.adminpassword=="password"){
        res.render('layouts/adminpage')
    }
    else{
        res.render('layouts/adminlogin')
    
        //req.flash('alert','fghfh')
        //res.redirect('/adminlogin')
        
    }
    
});
    
module.exports=router


  