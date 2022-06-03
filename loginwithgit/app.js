const express = require('express');
const app = express();
const superagent = require('superagent')
const request = require('request');
const port = 8700;
const cors = require('cors')
app.use(cors());

app.get('/',(req,res) => {
    res.send('<a href="https://github.com/login/oauth/authorize?client_id=">Login With Github</a>')
    
})

app.get('/profile',(req,res) => {
    const code = req.query.code;
    if(!code){
        res.send({
            success:false,
            message:'Error while Login'
        })
    }

    superagent
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_id:'',
            client_secret:'',
            code:code
        })
        .set('Accept','application/json')
        .end((err,result) => {
            if(err) throw err;
            let access_token = result.body.access_token;
            const option = {
                uri :'https://api.github.com/user',
                method:'GET',
                headers:{
                    'Accept': 'application/json',
                    'Authorization':`token ${access_token}`,
                    'User-Agent':'mycode'
                }
            }
            request(option, (err,response,body) => {
                res.send(body)
            })
        })
})

app.listen(port,() => {
    console.log(`listening on port ${port}`)
})