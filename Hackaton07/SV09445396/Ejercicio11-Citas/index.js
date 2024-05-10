console.log("Inicio de la aplicacion");
var http = require('http');
const axios = require('axios');
var url = require('url');
const { start } = require('repl');

http.createServer(async function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    var param = url.parse(req.url, true).query;

    console.log(param);

    let strUrl = req.url;

    if (strUrl.includes("citas")) {
        const options = {
            method: 'GET',
            url: 'http://quotes.rest/qod.json?category=inspire',
            params: {
            },
            headers: {
                'X-TheySaidSo-Api-Secret': 'J8bqLbhsrW8E4MtppqXcM5XGHLdvQxbDeCz4uusG',
            }
        };

        axios.request(options)
            .then((response) => {
                let objRespuesta = {
                    citas: response.data
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

