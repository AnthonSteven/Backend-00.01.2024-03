console.log("Inicio de la aplicacion");
var http = require('http');
const axios = require('axios');
var url = require('url');

http.createServer(async function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    let param = url.parse(req.url, true).query;
    let strUrl = req.url;
    if (strUrl.includes("users")) {

        const options = {
            method: 'GET',
            url: 'http://api.github.com/search/users',
            // http://localhost:8080/users?q=jbalcazar
            params: {
                q: param.q
            },
            headers: {
            }
        };

        axios.request(options)
            .then((response) => {
                console.log(response);
                let objRespuesta = {
                    datos : response.data,
                }
               res.write(JSON.stringify(objRespuesta));
               res.end();
            })
            .catch((error) => {
                console.log("Hubo un error en la aplicacion")
                console.log(error);
            });

    }
    else {
        res.write(JSON.stringify({ data: "Faltan datos!" }));
        res.end();
    }

}).listen(8080);

