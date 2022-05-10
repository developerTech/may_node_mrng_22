let express = require('express');
let categoryRouter = express.Router();
let mongodb = require('mongodb').MongoClient;
let url = process.env.MongoUrl;


function router(menu){
    categoryRouter.route('/')
    .get(function(req,res){
        mongodb.connect(url, function(err,dc){
            if(err) {
                res.status(500).send('Error While Connecting')
            }else{
                let dbObj = dc.db('may8');
                dbObj.collection('category').find().toArray(function(err,response){
                    if(err) {
                        res.status(500).send('Error While Fetching')
                    }else{
                        res.render('category',{title:'Category',data:response,menu})
                    }
                })

            }
        })
        //res.send(category)
        
    })

    categoryRouter.route('/details')
    .get(function(req,res){
        res.send('Category Details')
    }) 
    
    return categoryRouter
}


module.exports = router