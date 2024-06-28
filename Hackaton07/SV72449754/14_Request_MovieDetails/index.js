/* ******************************
            ID Peliculas

"id": 898010,
"id": 672181,
"id": 1248698,
"id": 870360,
"id": 915513,
"id": 915334,
"id": 942510,
"id": 1115282,
"id": 1278869,
"id": 1213674,
"id": 975234,
"id": 978102,
"id": 1085836,
"id": 1165650,
"id": 1209019,
"id": 1230299,
"id": 1231049,
"id": 1261562,
"id": 1276003,
"id": 1278656,
"id": 1278719,
"id": 1280083,
"id": 1281995,
"id": 1282247,
"id": 1287713,
"id": 1292983,
"id": 1294261,
"id": 1294618,
"id": 1299012,
"id": 1299343,
"id": 1299345,
"id": 1299348,
"id": 1299350,
"id": 1299812,
"id": 1299844,
"id": 1300316,
"id": 1300320,
"id": 1300333,
"id": 1300351,
"id": 1300356,
"id": 1300363,
"id": 1300848,
"id": 1300937,
"id": 1301495,
"id": 1301508,
"id": 1301513,
"id": 1283984,
"id": 629040,
"id": 829402,
"id": 1000965,
"id": 1022789,
"id": 1119546,
"id": 1183111,
"id": 1221342,
"id": 1259775,
"id": 1285004,
"id": 1287248,
"id": 1287733,
"id": 1288289,
"id": 1296474,
"id": 1299476,
"id": 1301645,
"id": 1301909,
"id": 1301591,
"id": 1301809,
"id": 1301351,
"id": 1301874,
"id": 1301832,
"id": 1301744,
"id": 1301892,
"id": 1212102,
"id": 1301969,
"id": 996084,
"id": 936059,
"id": 537755,
"id": 995746,
"id": 912417,
"id": 1301890,
"id": 1019273,
"id": 26274,
"id": 1302024,
"id": 185809,
"id": 1302025,
"id": 559401,
"id": 1302026,
"id": 214597,
"id": 455916,
"id": 612513,*/





/*===================================================
=====================================================
            SOLICITUD DE PELICULAS EN ESTRENO
            
    Ejecutar:
        Terminal: npm run dev 
        Navegador: http://localhost:8080/movies
        url: 'https://api.themoviedb.org/3/movie/{Id_Pelicula}'

        Id_Pelicula--> Coleccion de peliculas por id

    Ejemplo:
        Terminal: npm run dev 
        Navegador: http://localhost:8080/movies 


        ********* Display en la pagina ***********
        
        DETALLES DE PELICULA:

            TITULO : Papá consiguió trabajo en Marte

            adult: false
            backdrop_path: /jvtmqwvJlRAuBxiLaHHoUuUKYc8.jpg
            belongs_to_collection: null
            budget: 0
            genres: Animation / Adventure /
            homepage:
            id: 898010
            imdb_id: null
            origin_country: AR
            original_language: es
            overview: One Sunday in 1991, Félix and his sister Gemma, at the request of their mother, cycle through the streets of Santos Lugares, in search of their father. Félix believes that his dad got a job on the planet Mars.
            popularity: 0.51
            poster_path: /zDXkbn1vW6zHeCxlqQTn7zxGZP6.jpg
            production_companies: [object Object],[object Object],[object Object]
            production_countries: Argentina
            release_date: 2021-11-20
            revenue: 0
            runtime: 13
            spoken_languages: Spanish
            status: Released
            tagline:
            video: false
            vote_average: 8
            vote_count: 2
           
        *****************************************   
        
=====================================================
=====================================================*/




console.log("Inicio de la aplicacion");
var http = require('http');
const axios = require('axios');
var url = require('url');

http.createServer(async function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    //res.writeHead(200, { 'Content-Type': 'application/json' });
    console.log("req.url:"+req.url)
    let strUrl = req.url;
    
    if (strUrl.includes("/movies")) {

        const options = {
            method: 'GET',
              url: 'https://api.themoviedb.org/3/movie/898010',
            params: {
            },
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTcwODU1OGViZWM1ZmZmZjFlYzQxZDE0ZDcxODRmMiIsInN1YiI6IjY2MzZiMjBmOWE2NGMxMDEyMzNlYzliYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8LvWUoTjKbbsMsCE2CyNyzTlV_YU_KH7s-qDDVrkkak'
            }
        };
        let strHTML="";
        console.log( "options: ",options);
       
        //Solictud Axios - Detalles de Pelicula segun id
        axios.request(options)
            .then((response) => {
                strHTML+= `<b>DETALLES DE PELICULA: </b><ul>`;
                console.log("Ingrese a AXIOS");
                let Movie =response.data;
                console.log("Movie: ",Movie);
                strHTML+= `<p> TITULO : ${Movie.original_title} </p>`;
                console.log(`TITULO : ${Movie.original_title}`);
                for (const key in Movie) {
                    if (key !='original_title' && key !='title') {
                        if (key =='production_countries' ) {
                            if (Movie[key].length>0) {
                                strHTML+= `<li> ${key}: ${Movie[key][0].name} </li>`;
                                console.log(`-${key}: ${Movie[key][0].name}`);
                            }
                            else{
                                strHTML+= `<li> ${key}:  </li>`;
                            } 
                        }

                        else if (key =='spoken_languages') {
                            if (Movie[key].length>0) {
                                strHTML+= `<li> ${key}: ${Movie[key][0].english_name} </li>`;
                                console.log(`-${key}: ${Movie[key][0].english_name}`);
                            }
                            else{
                                strHTML+= `<li> ${key}:  </li>`;
                            }
                            
                        }

                        else if (key =='genres') {
                            if (Movie[key].length>0) {
                                strHTML+= `<li> ${key}: `;
                                console.log(`-${key}:`)
                                for (const iterator of Movie[key]) {
                                    strHTML+= `${iterator.name} / `;
                                    console.log(`${iterator.name} /`);
                                }
                                strHTML+= `</li>`
                            }
                            else{
                                strHTML+= `<li> ${key}:  </li>`;
                            }
                            
                        }

                        else{
                            strHTML+= `<li> ${key}: ${Movie[key]} </li>`;
                            console.log(`-${key}: ${Movie[key]}`);
                        }
                    }  
                }

                strHTML += "</ul>";

                res.write(strHTML);
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