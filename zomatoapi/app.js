let express = require('express')
let app = express()
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let dotenv = require('dotenv');
dotenv.config();
let mongoUrl = process.env.mongoLiveUrl;
let bodyParser = require('body-Parser');
let cors = require('cors');
let port = process.env.PORT || 7100;
let db;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())

let authKey = "Basicc20f4a1e1647d575198584debefc0558"
function auth(key){
    if(key == authKey){
        return true
    }
    return false
}

//get heart beat
app.get('/',(req,res) => {
    res.send('Welcome to Heart Beat')
})

/// list of city
app.get('/location',(req,res) => {
    //let key = req.query.key
    //let {key} = req.query
    let key = req.header('x-basic-token')
    if(key == authKey){
        db.collection('location').find().toArray((err,data) => {
            if(err) throw err;
            res.send(data)
        })
    }else{
        res.send('Unauthenticated User')
    }
})

app.get('/restaurants',(req,res) => {
    let query = {}
    let stateId = Number(req.query.stateId)
    let mealId = Number(req.query.mealId)
    if(mealId && stateId){
        query={'mealTypes.mealtype_id':mealId,'state_id':stateId}
    }
    else if(mealId){
        query={'mealTypes.mealtype_id':mealId}
    }
    else if(stateId){
        query = {'state_id':stateId}
    }
    db.collection('restaurants').find(query).toArray((err,data) => {
        if(err) throw err;
        res.send(data)
    })
})



app.get('/list/:item',(req,res) => {
    let colName = req.params.item
    db.collection(colName).find().toArray((err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log('Error While Connecting')
    db = client.db('augintern');
    app.listen(port,() => {
        console.log(`Listing to port ${port}`)
    })
})


/*
app.get('/restaurants',(req,res) => {
    let key = req.header('x-basic-token')
    if(auth(key)){
        db.collection('restaurants').find().toArray((err,data) => {
            if(err) throw err;
            res.send(data)
        })
    }else{
        res.send('Unauthenticated User')
    }
})
*/