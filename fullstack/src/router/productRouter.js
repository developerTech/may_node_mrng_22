let express = require('express');
let productRouter = express.Router();
let mongo = require('mongodb')
let mongodb = mongo.MongoClient;
let url = process.env.MongoUrl;

function router(menu){
    productRouter.route('/')
    .get(function(req,res){
        // res.send(products)
        mongodb.connect(url, function(err,dc){
            if(err) {
                res.status(500).send('Error While Connecting')
            }else{
                let dbObj = dc.db('may8');
                dbObj.collection('products').find().toArray(function(err,products){
                    if(err) {
                        res.status(500).send('Error While Fetching')
                    }else{
                        res.render('products',{title:'Products Page',products,menu})
                    }
                })

            }
        })
       
    })
    
    productRouter.route('/category/:id')
    .get(function(req,res){
        //const id = req.params.id;
        const {id} = req.params
        mongodb.connect(url, function(err,dc){
            if(err) {
                res.status(500).send('Error While Connecting')
            }else{
                let dbObj = dc.db('may8');
                dbObj.collection('products').find({"category_id":Number(id)}).toArray(function(err,products){
                    if(err) {
                        res.status(500).send('Error While Fetching')
                    }else{
                        res.render('products',{title:'Products Page',products,menu})
                    }
                })

            }
        })
        //res.send(id)
    })

    productRouter.route('/details/:id')
    .get(function(req,res){
        // for object id
        const id = mongo.ObjectId(req.params.id)
        //const {id} = req.params
        mongodb.connect(url, function(err,dc){
            if(err) {
                res.status(500).send('Error While Connecting')
            }else{
                let dbObj = dc.db('may8');
                dbObj.collection('products').find({"_id":id}).toArray(function(err,products){
                    if(err) {
                        res.status(500).send('Error While Fetching')
                    }else{
                        res.render('productDetails',{title:'Details Page',products,menu})
                    }
                })

            }
        })
        //res.send(id)
    })

    return productRouter
}


module.exports = router