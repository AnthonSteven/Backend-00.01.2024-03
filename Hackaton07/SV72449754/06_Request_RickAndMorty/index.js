/*===================================================
=====================================================
    SOLICITUD DEL NOMBRE DE LOS PERSONAJES
            DE LA SERIE RICK & MORTY
    Ejecutar:
        npm run dev 

    Ejemplo:
        npm run dev 

        ********* Display en la pagina ***********

            Personajes de la serie Rick & Morty:
                Rick Sanchez
                Morty Smith
                Summer Smith
                Beth Smith
                Jerry Smith
                Abadango Cluster Princess
                Abradolf Lincler
                Adjudicator Rick
                Agency Director
                Alan Rails
                Albert Einstein
                Alexander
                Alien Googah
                Alien Morty
                Alien Rick
                Amish Cyborg
                Annie
                Antenna Morty
                Antenna Rick
                Ants in my Eyes Johnson   

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
    
    if (strUrl.includes("/RM")) {

        const options= {
            method: 'GET',
            url:`https://rickandmortyapi.com/api/character`,
        };

        let strHTML="";
       
        //Solictud Axios - Nombre de Personajes Rick & Morty 
        axios.request(options)
            .then((response) => {
                strHTML+= `<b>Personajes de la serie Rick & Morty: </b><ol>`;
                console.log("Ingrese a AXIOS");
                let Personajes =response.data.results;
                //console.log("Personajes: ",Personajes)
                console.log("Lista de Personajes");
                Personajes.forEach(element => {
                    console.log("-"+element.name)
                    strHTML+= "<li>" + element.name + "</li>"
                });

                strHTML += "</ol>";
                console.log("Lista de Personajes HTML : ")
                console.log(strHTML);
                res.write(strHTML);
                res.end();
                      
            })
            .catch((error) => {
                console.log("Hubo un error en la aplicacion")
                console.log(error);
            });
    }
    else {
        res.write(JSON.stringify({ data: "cualquiercosa" }));
        res.end();
    }
    
}).listen(8080);