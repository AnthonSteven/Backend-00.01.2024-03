/*===================================================
=====================================================
    SOLICITUD DETALLADA DE LOS PERSONAJES
            DE LA SERIE RICK & MORTY
    Ejecutar:
        npm run dev 

    Ejemplo:
        npm run dev 

        ********* Display en la pagina ***********

            ** RICK SANCHEZ
            status : Alive
            species : Human
            type :
            gender : Male
            origin : Earth (C-137)
            location : Citadel of Ricks
            image : https://rickandmortyapi.com/api/character/avatar/1.jpeg
            url : https://rickandmortyapi.com/api/character/1
            created : 2017-11-04T18:48:46.250Z

            ** MORTY SMITH
            status : Alive
            species : Human
            type :
            gender : Male
            origin : unknown
            location : Citadel of Ricks
            image : https://rickandmortyapi.com/api/character/avatar/2.jpeg
            url : https://rickandmortyapi.com/api/character/2
            created : 2017-11-04T18:50:21.651Z  
                            .
                            .
                            .

            ** ANTS IN MY EYES JOHNSON
            status : unknown
            species : Human
            type : Human with ants in his eyes
            gender : Male
            origin : unknown
            location : Interdimensional Cable
            image : https://rickandmortyapi.com/api/character/avatar/20.jpeg
            url : https://rickandmortyapi.com/api/character/20
            created : 2017-11-04T22:34:53.659Z
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
       
        //Solictud Axios -Datos de Personajes de Rick & Morty 
        axios.request(options)
            .then((response) => {
                strHTML+= `<b>PERSONAJES DE LA SERIE RICK & MORTY: </b><ul>`;
                console.log("Ingrese a AXIOS");
                let Personajes =response.data.results;
                //console.log("Personajes: ",Personajes)
                console.log("Lista de Personajes");
                Personajes.forEach(element => {
                    for (const Clave in element) {
                        if (Clave!="id" && Clave!="episode") {
                            if (Clave=="name") {
                                strHTML+= `<p><span>** ${element[Clave].toUpperCase()}</span> </p>`;
                                console.log(`===>${element[Clave]}`);
                            }
                            else if(Clave=="origin" || Clave=="location"){
                                strHTML+= `<li> ${Clave} : ${element[Clave].name} </li>`;
                                console.log(`-${Clave} : ${element[Clave].name} `);
                            }

                            else{
                                strHTML+= `<li> ${Clave} : ${element[Clave]} </li>`;
                                console.log(`-${Clave} : ${element[Clave]} `);
                            }
                        }   
                    }
                    console.log("");
                    strHTML+= `<br>  </br>`
                });

                strHTML += "</ul>";
                console.log("Caracteristica de Personajes HTML : ")
                console.log(strHTML);
                res.write(strHTML);
                res.end();
                      
            })
            .catch((error) => {
                console.log("Hubo un error en la aplicacion");
                res.write("Hubo un error al Solicitar los Datos");
                res.end();
            });
    }
    else {
        res.write(JSON.stringify({ data: "cualquiercosa" }));
        res.end();
    }
    
}).listen(8080);