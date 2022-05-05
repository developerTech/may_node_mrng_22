let http = require('http');

// req >> what we will send to server
// res >> what we get in return

let server = http.createServer(function(req, res) {
    res.write('<h1>This is Node Sever</h1>')
    res.end()
})

server.listen(8980)