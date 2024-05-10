console.log("Inicio de la aplicacion");
var http = require('http');
const axios = require('axios');
var url = require('url');

http.createServer(async function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    var param = url.parse(req.url, true).query;

    console.log(param);

    let strUrl = req.url;

    if (strUrl.includes("avatar")) {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/account/21252017',
            params: {
            },
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTcwODU1OGViZWM1ZmZmZjFlYzQxZDE0ZDcxODRmMiIsInN1YiI6IjY2MzZiMjBmOWE2NGMxMDEyMzNlYzliYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8LvWUoTjKbbsMsCE2CyNyzTlV_YU_KH7s-qDDVrkkak'
            }
        };

        axios.request(options)
            .then((response) => {
                let objRespuesta = {
                    pelicula: response.data
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

