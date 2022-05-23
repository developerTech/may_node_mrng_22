let express = require('express')
let app = express()
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let dotenv = require('dotenv');
dotenv.config();
// let mongoUrl = process.env.mongoLiveUrl;
let mongoUrl = process.env.mongoUrl;
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

//filters
app.get('/filter/:mealId',(req,res) => {
    let sort = {cost:1}
    let skip = 0;
    let limit = 1000000000;
    let query ={}
    let mealId = Number(req.params.mealId);
    let cuisineId = Number(req.query.cuisineId);
    let lcost = Number(req.query.lcost)
    let hcost = Number(req.query.hcost)
    if(req.query.sort){
        sort={cost:req.query.sort}
    }
    if(req.query.skip && req.query.limit){
        skip = Number(req.query.skip);
        limit = Number(req.query.limit)
    }
    if(cuisineId&&lcost&&hcost){
        query={
            "mealTypes.mealtype_id":mealId,
            "cuisines.cuisine_id":cuisineId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }
    else if(cuisineId){
        query={
                "mealTypes.mealtype_id":mealId,
                "cuisines.cuisine_id":cuisineId
            }
    }else if(lcost&&hcost){
        query={
            "mealTypes.mealtype_id":mealId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }

    db.collection('restaurants').find(query).sort(sort).skip(skip).limit(limit).toArray((err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

/// restaurants details
app.get('/details/:id',(req,res) => {
    let id = Number(req.params.id)
    //let id = mongo.ObjectId(req.params.id)
    db.collection('restaurants').find({restaurant_id:id}).toArray((err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

/// menu wrt to restaurants
app.get('/menu/:id',(req,res) => {
    let restId = Number(req.params.id)
    db.collection('menu').find({restaurant_id:restId}).toArray((err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

/// menu wrt to ids
app.post('/menuItem',(req,res) => {
    console.log(req.body)
    if(Array.isArray(req.body)){
        db.collection('menu').find({menu_id:{$in:req.body}}).toArray((err,data) => {
            if(err) throw err;
            res.send(data)
        })
    }else{
        res.send('Please Pass the Array Only')
    }
    
})

// place order
app.post('/placeOrder',(req,res) => {
    db.collection('orders').insert(req.body,(err,data) => {
        if(err) throw err;
        res.send('Order Placed')
    })
})

//get Order
app.get('/getOrder',(req,res) => {
    let query = {}
    if(req.query.email){
        query = {email:req.query.email}
    }
    db.collection('orders').find(query).toArray((err,data) => {
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
    //db = client.db('augintern');
    db = client.db('internfeb');
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