console.log("Inicio de la aplicacion");
var http = require('http');
const axios = require('axios');
var url = require('url');

http.createServer(async function (req, res) {
   // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    // console.log(req.url)
    var q = url.parse(req.url, true).query;
    // console.log(q.ciudad);
    // console.log(q.pathname);
    let strUrl = req.url;
    if (strUrl.includes("clima")) {

        const options = {
            method: 'GET',
            url: 'https://weather-api138.p.rapidapi.com/weather',
            // http://localhost:8080/clima?ciudad=Lima
            params: {
                city_name: q.ciudad
            },
            headers: {
                'X-RapidAPI-Key': 'a51abe4751msh8ff2e48242c3f53p15c575jsn251f2a58e96e',                
                'X-RapidAPI-Host': 'weather-api138.p.rapidapi.com'
            }
        };

        axios.request(options)
            .then((response) => {
                console.log(response);
                let objRespuesta = {
                    temperatura : (parseFloat( response.data.main.temp) - 273.15),
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

