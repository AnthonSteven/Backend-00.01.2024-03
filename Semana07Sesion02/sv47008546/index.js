console.log("Hola alumnos buenas noches");

var http = require('http');
const axios = require('axios');
var url = require('url');



http.createServer(async function (req, res) {
    //res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.writeHead(200, { 'Content-Type': 'text/plain' });

    console.log(req.url);
    var q = url.parse(req.url, true).query; // --> dividimos una direccion web en partes legibles 
    console.log(q.ciudad);
    console.log(q.pathname);
    let strUrl = req.url;
    if (strUrl.includes("clima")) {
        const options = {
            method: 'GET',
            url: 'https://weather-api138.p.rapidapi.com/weather',
            params: {
                city_name: q.ciudad
            },
            headers: {
                'x-rapidapi-key': '2e22792e93msh4ecb486976390aap1cec5ejsn7364db510c0a',
                'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
            }
        };
        axios.request(options)
            .then((response) => {
                let strHTML = `<div> <label><b>Temperatura: </b> ${(parseFloat(response.data.main.temp) - 273.15)} </label> </div>`;
                let objRespuesta = {
                    temperatura : (parseFloat( response.data.main.temp) - 273.15),
                    amanecer :  new Date(parseInt(response.data.sys.sunrise)*1000).toISOString()
                } // parseFloat = convierte de string a numero con decimales.
                res.write(JSON.stringify(objRespuesta));
                // res.write(strHTML);
                res.end();
            })
            .catch((error) => {
                console.log("Hubo un error en la aplicacion")
                console.log(error);
            });

    }
    else {
        res.write(JSON.stringify({ data: "Cualquier cosa" }));
        res.end();
    }

}).listen(8080);




