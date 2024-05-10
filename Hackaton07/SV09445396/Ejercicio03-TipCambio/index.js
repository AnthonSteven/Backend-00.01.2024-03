console.log("Inicio de la aplicacion");
var http = require('http');
const axios = require('axios');
var url = require('url');

http.createServer(async function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    var param = url.parse(req.url, true).query;
    let strUrl = req.url;

    if (strUrl.includes("latest")) {
        const options = {
            method: 'GET',
            url: 'https://api.frankfurter.app/latest',
            //http://localhost:8080/latest?to=USD,AUD
            // No se encontro conversion para peru
            params: {
                to: param.to
            },
            headers: {
            }
        };

        axios.request(options)
            .then((response) => {
                let objRespuesta = {
                    tipocambio: response.data.rates
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

