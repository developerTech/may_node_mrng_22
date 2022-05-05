let fs = require('fs');
let http = require('http');

let server = http.createServer(function(req, res){
    fs.readFile('data.json','utf-8',function(err, data){
        if(err) throw err;
        res.write(data);
        res.end();
    })
})

server.listen(8900)