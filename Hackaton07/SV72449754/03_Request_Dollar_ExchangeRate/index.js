/*===================================================
=====================================================
    SOLICITUD DE TIPO DE CAMBIO DE MONEDAS
    Ejecutar:
        Terminal==> npm run dev 
        Navegador==>http://localhost:8080/rate?from=q.from

        q.from -->Inidca el tipo de Moneda


    Ejemplo:
        npm run dev
        http://localhost:8080/rate?from=USD

        ********* Display en la pagina ***********

            {
                "amount": 1,
                "base": "USD",
                "date": "2024-06-07",
                "rates": {
                    "AUD": 1.4998,
                    "BGN": 1.7946,
                    "BRL": 5.2448,
                    "CAD": 1.3674,
                    "CHF": 0.8897,
                    "CNY": 7.2413,
                    "CZK": 22.552,
                    "DKK": 6.8465,
                    "EUR": 0.9176,
                    "GBP": 0.78106,
                    "HKD": 7.8083,
                    "HUF": 356.87,
                    "IDR": 16192,
                    "ILS": 3.7367,
                    "INR": 83.4,
                    "ISK": 137.55,
                    "JPY": 155.55,
                    "KRW": 1367.2,
                    "MXN": 17.888,
                    "MYR": 4.691,
                    "NOK": 10.54,
                    "NZD": 1.6146,
                    "PHP": 58.53,
                    "PLN": 3.9347,
                    "RON": 4.5663,
                    "SEK": 10.3758,
                    "SGD": 1.3446,
                    "THB": 36.48,
                    "TRY": 32.267,
                    "ZAR": 18.7943
                }
            }    

        *****************************************   

=====================================================
=====================================================*/

console.log("Inicio de la aplicacion");
var http = require('http');
const axios = require('axios');
var url = require('url');

http.createServer(async function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    console.log("req.url:"+req.url)
    let strUrl = req.url;
    var q = url.parse(req.url, true).query;

    if (strUrl.includes("/rate")) {

        const options= {
            method: 'GET',
            url:`https://api.frankfurter.app/latest?from=${q.from}`,
        };
      
        //Solictud Axios - Tipo de cambio de Monedas 
        axios.request(options)
            .then((response) => {
                console.log("Ingrese a AXIOS");
                let ExchangeRate =response.data;
                console.log("TIPO DE CAMBIO: ",ExchangeRate)
                res.write(JSON.stringify(ExchangeRate));
                res.end();    
            })
            .catch((error) => {
                console.log("Hubo un error en la aplicacion")
                res.write("Hubo un error con el tipo de Moneda");
                res.end();
            });
    }
    else {
        res.write(JSON.stringify({ data: "cualquiercosa" }));
        res.end();
    }
    
}).listen(8080);