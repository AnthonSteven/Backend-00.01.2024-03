/*===================================================
=====================================================
    SOLICITUD DE REQUIMIENTO DE POKEMON Y HABILADES
    Ejecutar:
        npm run dev Numero

        Numero----> Indica el numero de pokemon de 
        la lista Poke Api(1302) que se desea consultar
        Por defecto Numero=1

    Ejemplo:
        npm run dev 6

        ********* Display en la pagina ***********

            POKEMON SOLICITADO:
            Nombre: charizard
            Numero: 6
            Habilidades:
                *blaze
                *solar-power    

        *****************************************   

=====================================================
=====================================================*/

console.log("Inicio de la aplicacion");
var http = require('http');
const axios = require('axios');
var url = require('url');
const NumPokemon=parseInt(process.argv[2] ?? 1);
let url_Aux="";

console.log("Iniciando recorrido de la Rutina");
http.createServer(async function (req, res) {
    console.log("Iniciando Rutina HTTP");
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    let strUrl = req.url;
    
    if (strUrl.includes("/PokeApi")) {

        if (NumPokemon>=1) {
            url_Aux=`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${NumPokemon}`;
        }
        
        const options= {
            method: 'GET',
            url:url_Aux,
        };
      

        //1ra solictud Axios - Nombre y URL Habilidades    
        let strHTML="<b>POKEMON SOLICITADO: </b>";
        console.log("1ra Solicitud  de Datos de Pokemon en Especifico");

        const DataPokemon = await axios.request(options)
            .then((response) => {
                console.log("Ingrese a AXIOS-01");
                let NamePokemon =response.data.results[NumPokemon-1].name;
                let URL_Skill =response.data.results[NumPokemon-1].url;
                console.log("Nombre de Pokemon: ",NamePokemon);
                console.log("Url de Habilidades Pokemon: ",URL_Skill);
                return [NamePokemon,URL_Skill];      
                })
            .catch((error) => {
                console.log("Hubo un error en la aplicacion")
                console.log(error);
            });


        const options_Skills= {
            method: 'GET',
            url:DataPokemon[1],
        };

        
        console.log("2da Solicitud  de Habilidades de Pokemon en Especifico");

        //2da solictud Axios - Habilidades Pokemon
        axios.request(options_Skills)
            .then((response) => {
                console.log("Ingrese a AXIOS-02");
                strHTML+= `<h4>Nombre: ${DataPokemon[0]}</h4><h5>Numero: ${NumPokemon}</h5>
                <h5>Habilidades:</h5><ul>`;
                let SkillsPokemon =response.data.abilities;
            
                SkillsPokemon.forEach(element => {
                console.log("Skill: "+element.ability.name)
                strHTML+= "<li>" + element.ability.name + "</li>"
                });

                strHTML += "</ul>";
                console.log("strHTML : ")
                console.log(strHTML);
                res.write(strHTML);
                res.end();
                    
                })
            .catch((error) => {
                console.log("Hubo un error en la aplicacion")
                console.log(error);
            });

        console.log("======> Hago algo mientras llega la data de Habilidades Pokemon");    
        console.log("Finalizando Rutina HTTP");
    }
    else {
        res.write(JSON.stringify({ data: "cualquiercosa" }));
        res.end();
    }
    
}).listen(8080);

console.log("Finalizando recorrido de la Rutina");