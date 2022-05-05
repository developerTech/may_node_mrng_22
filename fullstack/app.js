let express = require('express');
let app = express();
let port = 7600;
let fs = require('fs');
let categoryRouter = require('./src/router/categoryRouter')
let productRouter = require('./src/router/productRouter')
let morgan = require('morgan');
let helmet = require('helmet')

app.use(morgan('short',{stream: fs.createWriteStream('./app.logs')}))
app.use(helmet()); // https://www.npmjs.com/package/helmet

//default route
app.get('/',function(req,res){
    res.send('Welcome to Shopping')
})

app.use('/category', categoryRouter)
app.use('/products', productRouter)

app.listen(port, function(err){
    if(err) throw err;
    else{
        console.log('Server is running on port 7600')
    }
})