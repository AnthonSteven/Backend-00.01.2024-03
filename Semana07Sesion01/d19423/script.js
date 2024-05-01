console.log("Hola alumnos buenas noches")
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hola desde nodejs!');
}).listen(8080);