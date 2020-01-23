const express = require('express')
const app = express()

const bodyParser= require('body-parser')
//app.set('view engine', 'ejs')
const router= express.Router()
//const port = 3000
var path = require('path')
// app.use(bodyParser())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use('/cssFiles', express.static(__dirname + '/views/css/'));
// app.set('views', path.join(__dirname, 'views/layouts/'));

router.get('/', function (req, res) {
    

  res.render('layouts/home',{ })
})

//app.listen(3000, () => console.log(`server started`))
module.exports=router
