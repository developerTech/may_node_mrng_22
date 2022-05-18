let express = require('express')
let app = express()
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let dotenv = require('dotenv');
dotenv.config();
let mongoUrl = process.env.mongoUrl;
let bodyParser = require('body-Parser');
let cors = require('cors');
let port = process.env.PORT || 7100;
let db;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())

//get heart beat
app.get('/',(req,res) => {
    res.send('Welcome to Heart Beat')
})

MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log('Error While Connecting')
    db = client.db('augintern');
    app.listen(port,() => {
        console.log(`Listing to port ${port}`)
    })
})
