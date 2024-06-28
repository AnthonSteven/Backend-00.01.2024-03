/*===================================================
=====================================================
        SOLICITUD  DE UNA FOTOGRAFIA
    Ejecutar:
        Terminal: npm run dev 
        Navegador: http://localhost:8080/foto

    Ejemplo:
        
        ********* Display en la pagina ***********

            
        *****************************************   

=====================================================
=====================================================*/


console.log("Inicio de la aplicacion");
var http = require('http');
const axios = require('axios');
const fs=require('fs');
var url = require('url');

http.createServer(async function (req, res) {
   //res.writeHead(200, { 'Content-Type': 'image/jpeg'});
    res.writeHead(200, { 'Content-Type': 'application/json' });
    console.log("req.url:"+req.url)
    let strUrl = req.url;
    
    if (strUrl.includes("/foto")) {

        const options= {
            method: 'GET',
            //url:'https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&fit=crop&w=1080&q=80&fit=max',
            url: 'https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9',
       
            params: {
                fm:'jpg',
                fit:'crop',
                w:1080,
                q:80,
                fit:'max'
            
            },
        };

        /*fs.readFile('./descarga.jpg',(err,data)=>{
            if(err){
                res.end('Falla');
            }else {
                
               // res.setHeader('Content-Type', 'image/jpeg');
                res.end(data);
            }
        })*/
        
       
        //Solictud Axios - Imagen
        axios.request(options)
            .then((response) => {
                
               // console.log("reponse:",response.data);
                let Imagen=response.data;
                res.write(JSON.stringify(Imagen));
                //res.write(Imagen);
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