/*===================================================
=====================================================
    SOLICITUD DE USUARIO GITHUB
    Ejecutar:
        Terminal==> npm run dev 
        
        Navegador==>http://localhost:8080/user?usuario=q.usuario

        q.usuario -->Inidca el Usuario a consultar


    Ejemplo:
        npm run dev
        http://localhost:8080/user?usuario=MarCtrl

        ********* Display en la pagina ***********

            {
                "login": "MarCtrl",
                .
                .
                .
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
    console.log("q.usuario: ",q.usuario);

    if (strUrl.includes("/user")) {

        const options= {
            method: 'GET',
            url:`https://api.github.com/users/${q.usuario}`,
        };
      
        //Solictud Axios - Datos de Usuario GitHub
        axios.request(options)
            .then((response) => {
                console.log("Ingrese a AXIOS");
                let DataUserGitHub =response.data;
                console.log("USUARIO GITHUB: ",DataUserGitHub);
                res.write(JSON.stringify(DataUserGitHub));
                res.end();    
            })
            .catch((error) => {
                console.log("Hubo un error en la aplicacion");
                console.error("Error en la URL: ",req.url);
                res.write("Hubo un error al Solicitar el Usuario");
                res.end();
            });
    }
    else {
        res.write(JSON.stringify({ data: "cualquiercosa" }));
        res.end();
    }
    
}).listen(8080);