/*===================================================
=====================================================
            SOLICITUD DE BEBIDAS Y COCTELES
    Ejecutar:
        Terminal: npm run dev 
        Navegador: http://localhost:8080/bebidas

    Ejemplo:
        
        ********* Display en la pagina ***********

            LISTA DE BEBIDAS Y COCTELES:
                Highball glass
                Cocktail glass
                Old-fashioned glass
                Whiskey Glass
                Collins glass
                Pousse cafe glass
                Champagne flute
                Whiskey sour glass
                Cordial glass
                Brandy snifter
                White wine glass
                Nick and Nora Glass
                Hurricane glass
                Coffee mug
                Shot glass
                Jar
                Irish coffee cup
                Punch bowl
                Pitcher
                Pint glass
                Copper Mug
                Wine Glass
                Beer mug
                Margarita/Coupette glass
                Beer pilsner
                Beer Glass
                Parfait glass
                Mason jar
                Margarita glass
                Martini Glass
                Balloon Glass
                Coupe Glass

        *****************************************   

=====================================================
=====================================================*/


console.log("Inicio de la aplicacion");
var http = require('http');
const axios = require('axios');
var url = require('url');

http.createServer(async function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    console.log("req.url:"+req.url)
    let strUrl = req.url;
    
    if (strUrl.includes("/bebidas")) {

        const options= {
            method: 'GET',
            url:`https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list`,
        };

        let strHTML="";
       
        //Solictud Axios - Bebidas y Cocteles
        axios.request(options)
            .then((response) => {
                strHTML+= `<b>LISTA DE BEBIDAS Y COCTELES: </b><ol>`;
                console.log("Ingrese a AXIOS");
                let Bebidas =response.data.drinks;
                //console.log("Bebidas: ",Bebidas)
                console.log("Lista de Bebidas y Cocoteles");
                Bebidas.forEach(element => {
                    console.log("-"+element.strGlass)
                    strHTML+= "<li>" + element.strGlass + "</li>"
                });

                strHTML += "</ol>";
                console.log("Lista de Bebidas y Cocteles HTML : ")
                console.log(strHTML);
                res.write(strHTML);
                res.end();
                      
            })
            .catch((error) => {
                console.log("Hubo un error en la aplicacion");
                console.error(error);
                res.write("Hubo un error en la aplicacion");
                res.end();
               
            });
    }
    else {
        res.write(JSON.stringify({ data: "cualquiercosa" }));
        res.end();
    }
    
}).listen(8080);