const express = require('express');
const bodyParser = require('body-parser');
//const fileUpload = require('express-fileupload');
const app = express();
const port = process.env.PORT || 8970;

//static file path
app.use(express.static(__dirname + '/public'))
app.set('view engine','ejs')

// middleware
app.use(bodyParser.json())
//app.use(fileUpload())

app.get('/',(req,res) => {
    res.render('index')
})

app.post('/profile',(req,res) => {
    console.log(req.body)
    console.log(req.files)
    const imageFile = req.files.yourImage;
    imageFile.mv(`${__dirname}/public/images/${imageFile.name}`,(err,data) => {
        if(err) throw err;
        res.render('display',{title:req.body.uname,image:`${imageFile.name}`})
    })
    res.send('ok')
})

app.listen(port,(err) =>{
    console.log(`Server is running at ${port}`)
})