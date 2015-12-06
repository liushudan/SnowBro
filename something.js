var http = require('http');

function handler(request, resposne) {
    res.end("Hello World");
}
var server = http.createServer(handler);

server.listen(8080, 'localhost');