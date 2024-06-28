/*===================================================
=====================================================
    SOLICITUD DE TEMPERATURA DE UNA CIUDAD
    Ejecutar:
        Terminal==> npm run dev 
        
        Navegador==>http://localhost:8080/clima?ciudad=NombreCiudad

       NombreCiudad -->Inidca el nombre de la ciudad a consultar


    Ejemplo:
        npm run dev
        http://localhost:8080/clima?ciudad=Huancavelica

        ********* Display en la pagina ***********

            Ciudad de Huancavelica

                Temperatura: 9 °C
                Fecha y Hora: Sun Jun 09 2024 13:53:40 GMT-0500 (Colombia Standard Time)

        *****************************************   

=====================================================
=====================================================*/

console.log("Inicio de la aplicacion");
var http = require('http');
const axios = require('axios');
var url = require('url');

http.createServer(async function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    console.log("req.url",req.url)
    var q = url.parse(req.url, true).query;
    console.log("q.ciudad",q.ciudad);
    let strUrl = req.url;

    if (strUrl.includes("clima")) {
        const options = {
            method: 'GET',
                 
            url: 'https://weather-api138.p.rapidapi.com/weather',
            params: {
                city_name: q.ciudad
            },
            headers: {
                'X-RapidAPI-Key': '436997ebbcmsh2b011b03f1606fap10d7b7jsnee2ccf643612',
                'X-RapidAPI-Host': 'weather-api138.p.rapidapi.com'
            }
        };
        axios.request(options)
            .then((response) => {
               let strHTML = `<div> <b>Ciudad de ${response.data.name}</b><br></br>
               <label>Temperatura: ${parseInt(parseFloat( response.data.main.temp) - 273.15)} °C </label> <br></br>
               <label>Fecha y Hora: ${Date(parseInt(response.data.sys.sunrise)*1000)}  </label> 
               </div>`;
                res.write(strHTML);
                res.end();
            })
            .catch((error) => {
                console.log("Hubo un error en la aplicacion")
                console.log(error);
                res.end("Error al Leer la Pagina");
            });

    }
    else {
        res.write(JSON.stringify({ data: "cualquiercosa" }));
        res.end();
    }

}).listen(8080);
