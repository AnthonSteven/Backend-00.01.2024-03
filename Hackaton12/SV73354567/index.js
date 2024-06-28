// index.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { crearLista } = require('./handlers/crearLista');
const { mostrarPendientes } = require('./handlers/mostrarPendientes');
const { mostrarCompletados } = require('./handlers/mostrarCompletados');

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname === '/crear-lista' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            req.body = JSON.parse(body);
            crearLista(req, res);
        });
    } else if (reqUrl.pathname === '/pendientes') {
        mostrarPendientes(req, res);
    } else if (reqUrl.pathname === '/completados') {
        mostrarCompletados(req, res);
    } else if (reqUrl.pathname === '/') {
        // Servir el archivo HTML
        const htmlPath = path.join(__dirname, 'index.html');
        fs.readFile(htmlPath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error interno del servidor');
                return;
            }

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    } else {
        res.statusCode = 404;
        res.end('Ruta no encontrada');
    }
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});