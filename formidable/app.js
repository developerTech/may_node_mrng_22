const express = require('express');
const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload');
const fs = require('fs')
const formidable = require('formidable');
const app = express();
const port = process.env.PORT || 8970;

//static file path
app.use(express.static(__dirname + '/public'))
app.set('view engine','ejs')

// middleware
app.use(bodyParser.json())
// app.use(fileUpload())

app.get('/',(req,res) => {
    res.render('index')
})

app.post('/profile',(req,res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.yourImage.filepath;
        var newpath = `${__dirname}/public/images/${files.yourImage.originalFilename}`;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.send('File uploaded and moved!');
        });
    })
})

app.listen(port,(err) =>{
    console.log(`Server is running at ${port}`)
})