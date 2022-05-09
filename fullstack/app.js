let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 7600;
let fs = require('fs');
let morgan = require('morgan');
let helmet = require('helmet')

let menu = [
    {link:'/',name:'Home'},
    {link:'/category',name:'Category'},
    {link:'/products',name:'Products'}
]

let categoryRouter = require('./src/router/categoryRouter')(menu)
let productRouter = require('./src/router/productRouter')(menu)

app.use(morgan('short',{stream: fs.createWriteStream('./app.logs')}))
//app.use(helmet()); // https://www.npmjs.com/package/helmet

//static files path
app.use(express.static(__dirname+'/public'))
// html file path
app.set('views','./src/views')
// view engine name
app.set('view engine', 'ejs')

//default route
app.get('/',function(req,res){
    // res.send('<h1>Welcome to Shopping</h1>')
    res.render('index',{title:'Home Page',menu:menu})
})

app.use('/category', categoryRouter)
app.use('/products', productRouter)

app.listen(port, function(err){
    if(err) throw err;
    else{
        console.log(`Server is running on port ${port}`)
    }
})