/*===================================================
=====================================================
            SOLICITUD DE CITAS DEL DIA
            
    Ejecutar:
        npm run dev 

    Ejemplo:
        npm run dev 

        ********* Display en la pagina ***********

           
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
    
    if (strUrl.includes("/citas")) {

        const options= {
            method: 'GET',
            url:'https://quotes.rest/qod',
            
            params: {
                category:'inspire',
            },
            headers:{
                'X-TheySaidSo-Api-Secret':'s98ggkhqfmlaLvgl5XTtGceDAxZEM83DyzUKrmPu',
            }
        };

       
        //Solictud Axios - Citas del Dia
        axios.request(options)
            .then((response) => {
               
                console.log("Ingrese a AXIOS");
                let Cita =response.data;
                console.log("Cita del Dia: ", Cita);
                res.write(JSON.stringify(Cita));
                res.end();
                      
            })
            .catch((error) => {
                console.log("Hubo un error en la aplicacion");
                console.log(error);
                res.write("Hubo un error al Solicitar los Datos");
                res.end();
            });
    }
    else {
        res.write(JSON.stringify({ data: "cualquiercosa" }));
        res.end();
    }
    
}).listen(8080);