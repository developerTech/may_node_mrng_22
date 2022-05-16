let express = require('express');
let app = express();
let request = require('request');
let port = process.env.PORT || 7600;

app.use(express.static(__dirname + '/public'))
app.set('views', './src/views');
app.set('view engine','ejs');

app.get('/weather/:city',(req,res) => {
    let city = req.params.city;
    let url = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
    // calling api
    request(url,(err,apiResponse) => {
        if(err) throw err;
        const output = JSON.parse(apiResponse.body);
        res.render('index',{title:'Weather App',result:output})
    })
})

app.listen(port,(err) => {
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})