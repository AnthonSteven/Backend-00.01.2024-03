/*===================================================
=====================================================
    SOLICITUD DE LOS NOMBRES DE LOS POKEMOS DE LA
    LISTA POKE API
    Ejecutar:
        npm run dev Numero

        Numero----> Indica el numero de pokemones de 
        la lista Poke Api(1302) que se desea consultar
        Por defecto Numero=1

    Ejemplo:
        npm run dev 5

        ********* Display en la pagina ***********

            NOMBRE DE LOS POKEMON:
                Los Primeros 5 de la Lista
                1._bulbasaur
                2._ivysaur
                3._venusaur
                4._charmander
                5._charmeleon    

        *****************************************   

=====================================================
=====================================================*/

console.log("Inicio de la aplicacion");
var http = require('http');
const axios = require('axios');
var url = require('url');
const NumPokemon=parseInt(process.argv[2] ?? 1);
let url_Aux="";

http.createServer(async function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    console.log("req.url:"+req.url)
    console.log("url:"+url)
    let strUrl = req.url;
    
    if (strUrl.includes("/PokeApi")) {

        if (NumPokemon>=1) {
            url_Aux=`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${NumPokemon}`;
        }
        
        console.log("Url API: ",url_Aux);
        const options= {
            method: 'GET',
            url:url_Aux,
        };

        
        let strHTML="<b>NOMBRE DE LOS POKEMON: </b>";
       
        // solictud Axios - Nombre de Pokemones 
        axios.request(options)
            .then((response) => {
                strHTML+= `<h4> Los Primeros ${NumPokemon} de la Lista</h4><ol>`;
                console.log("Ingrese a AXIOS");
                let NamePokemon =response.data.results;
                NamePokemon.forEach(element => {
                    console.log(element.name)
                    strHTML+= "<li>" + element.name + "</li>"
                });

                strHTML += "</ol>";
                console.log("strHTML : ")
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