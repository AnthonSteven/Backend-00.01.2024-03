console.log("Inicio de la aplicacion");
var http = require('http');
const axios = require('axios');
var url = require('url');

http.createServer(async function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    var param = url.parse(req.url, true).query;

    console.log(param);

    let strUrl = req.url;

    if (strUrl.includes("bebidas")) {
        const options = {
            method: 'GET',
            url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail',
            params: {
            },
            headers: {
            }
        };

        axios.request(options)
            .then((response) => {
                let objRespuesta = {
                    bebidas: response.data
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

