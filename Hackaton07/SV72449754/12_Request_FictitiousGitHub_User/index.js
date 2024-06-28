/*============================================================
==============================================================
    SOLICITUD  DE DATOS DE UN USUARIO FICTICIO Y ALEATORIO
    Ejecutar:
        Terminal: npm run dev 
        Navegador: http://localhost:8080/RandomUser"

    Ejemplo:
        
        ********* Display en la pagina ***********
        {
        "Solicitud": "Usuario Aleatorio y Ficticio",
        "datos": {
            "results": [
            {
                "gender": "male",
                "name": {
                "title": "Mr",
                "first": "Gökhan",
                "last": "Demirel"
                },
                "location": {
                "street": {
                    "number": 3800,
                    "name": "Şehitler Cd"
                },
                "city": "Van",
                "state": "Giresun",
                "country": "Turkey",
                "postcode": 83696,
                "coordinates": {
                    "latitude": "67.0341",
                    "longitude": "-119.7116"
                },
                "timezone": {
                    "offset": "+6:00",
                    "description": "Almaty, Dhaka, Colombo"
                }
                },
                "email": "gokhan.demirel@example.com",
                "login": {
                "uuid": "64c65c5d-6c2d-4eb5-bc34-d4ff4ae448ee",
                "username": "brownfish833",
                "password": "robin",
                "salt": "xXjY6QtR",
                "md5": "5573f6603b357c7ef258a447ddeebe0f",
                "sha1": "c3c97b6e1c651fd4a2a7358f3212a567baaa0a62",
                "sha256": "146c49bca97f694a2ca62c5badd5f9095940d352b763aa6cfb2a8c5457f1fc32"
                },
                "dob": {
                "date": "1961-06-22T16:13:33.693Z",
                "age": 62
                },
                "registered": {
                "date": "2021-06-08T13:58:57.830Z",
                "age": 3
                },
                "phone": "(269)-225-8996",
                "cell": "(806)-955-4073",
                "id": {
                "name": "",
                "value": null
                },
                "picture": {
                "large": "https://randomuser.me/api/portraits/men/98.jpg",
                "medium": "https://randomuser.me/api/portraits/med/men/98.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/men/98.jpg"
                },
                "nat": "TR"
            }
            ],
            "info": {
            "seed": "52f033cc2ba1ef23",
            "results": 1,
            "page": 1,
            "version": "1.4"
            }
          }
        }
            
        *****************************************   

==========================================================
==========================================================*/


console.log("Inicio de la aplicacion");
var http = require('http');
const axios = require('axios');
const fs=require('fs');
var url = require('url');

http.createServer(async function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    console.log("req.url:"+req.url)
    let strUrl = req.url;
    
    if (strUrl.includes("/RandomUser")) {

        const options= {
            method: 'GET',
            url: 'https://randomuser.me/api/',
       
        };

        //Solictud Axios - Datos Aleatorio de un Usuario Ficticio
        axios.request(options)
            .then((response) => {
                let RandomUser=response.data;
                let Obj={
                    Solicitud:'Usuario Aleatorio y Ficticio',
                    datos:RandomUser
                };
                res.write(JSON.stringify(Obj));
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