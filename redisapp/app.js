let express = require('express');
let axios = require('axios')
let redis = require('redis')
let port = process.env.PORT || 7600;
let app = express();
let client = redis.createClient({
    host:'localhost',
    port:6379
})

app.get('/data',(req,res) => {
    let userInput = (req.query.country).trim();
    let url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;
    // check in redis first
    return client.get(`${userInput}`,(err,result) => {
        //if data is in redis
        if(result){
            const output = JSON.parse(result);
            res.send(output)
        }else{
            // as data is not in redis fetch from api
            axios.get(url)
            .then((response) =>{
                //save response in redis
                const output =response.data
                client.setex(`${userInput}`, 3600, JSON.stringify({source:'Redis Cache',output}))
                //return response to api first time
                res.status(200).send({source:'Api',output})
            })
        }
    })
})


app.listen(port,(err) => {
    console.log(`Server is running on port ${port}`)
})