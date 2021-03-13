//console.log('Hello World!');

var http = require('http');


function sayHello(reg, res) {
    console.log('Recived a reguest for: ' + reg.url);

    if (reg.url == '/') {

        res.writeHead(200, {"Content-Type": "text/html"});
        res.write('<h1>Welcome to the homepage</h1>');
        res.end();
        
    } else if (reg.url == '/home') {

        res.writeHead(200, {"Content-Type": "text/html"});
        res.write('<h1>Hello World!</h1>');
        res.end();

    } else if (reg.url == '/getData') {
        
        res.writeHead(200, {"Content-Type": "application/json"});
        
        var data = {name: "Bryce Dickson", class: "CSE-341"}
        
        res.write(JSON.stringify(data));
        res.end();

    } else {

        res.writeHead(404, {"Content-Type": "text/html"});
        res.write('<h1>Error 404 page not found</h1>');
        res.end();

    }

}

var server = http.createServer(sayHello);

server.listen(8888);

console.log('The server is now listening on port 8888...');