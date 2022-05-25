let express = require('express')
let app = express()
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl = "mongodb://localhost:27017";
let bodyParser = require('body-Parser');
let cors = require('cors');
let port = process.env.PORT || 9700;
let db;
let col_name = "adminUser"
let swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('./swagger.json');
let package = require('./package.json');

swaggerDocument.info.version = package.version;
app.use('/api-doc',swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())

app.get('/health',(req,res) => {
    res.send('Health Ok')
})

//get Users
app.get('/users',(req,res) => {
    let query= {}
    if(req.query.city && req.query.role){
        query ={city:req.query.city,role:req.query.role,isActive:true}
    }
    else if(req.query.city){
        query ={city:req.query.city,isActive:true}
    }else if(req.query.role){
        query ={role:req.query.role,isActive:true}
    }else if(req.query.isActive){
        let isActive = req.query.isActive;
        if(isActive == "false"){
            isActive = false
        }else{
            isActive = true
        }
        query = {isActive}
    }
    db.collection(col_name).find(query).toArray((err,result) => {
        if(err) throw err;
        res.status(200).send(result)
    })
})

app.get('/user/:id',(req,res) => {
    let id = mongo.ObjectId(req.params.id)
    db.collection(col_name).find({_id:id}).toArray((err,result) => {
        if(err) throw err;
        res.status(200).send(result)
    })
})

//add Users
app.post('/addUser',(req,res) => {
    db.collection(col_name).insert(req.body,(err,result) => {
        if(err) throw err;
        res.status(200).send(result)
    })
})

app.put('/updateUser',(req,res) => {
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
               name:req.body.name,
               city:req.body.city,
               phone:req.body.phone,
               role:req.body.role,
               isActive:true 
            }
        },(err,result) => {
            res.send('Data Updated')
        }
    )
})

//hard Delete
app.delete('/deleteUser',(req,res) => {
    let id = mongo.ObjectId(req.params.id)
    db.collection(col_name).remove({_id:id},(err,result) => {
        if(err) throw err;
        res.status(200).send('User Removed')
    })
})

//soft delete
app.put('/deactivateUser',(req,res) => {
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
               isActive:false 
            }
        },(err,result) => {
            res.send('User Deactivated')
        }
    )
})


app.put('/activateUser',(req,res) => {
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
               isActive:true 
            }
        },(err,result) => {
            res.send('User Activated')
        }
    )
})


MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log('Error While Connecting')
    db = client.db('may8');
    app.listen(port,() => {
        console.log(`Listing to port ${port}`)
    })
})