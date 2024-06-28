/*--url 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmZkZTk0Yzg2ZDYwZTY0MDk1NjRlNjBiNDE0YTE2NCIsInN1YiI6IjY2NjcyYTQ5M2E5NzI5YTk5NmFhNTEyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bw1epQ9d8bfAQObJFDQ1vIaxK37gE26ehurJbyhE7sI' \
--header 'accept: application/json'*/

/*===================================================
=====================================================
            SOLICITUD DE PELICULAS EN ESTRENO
            
    Ejecutar:
        Terminal: npm run dev 
        Navegador: http://localhost:8080/movies
    Ejemplo:
        Terminal: npm run dev 
        Navegador: http://localhost:8080/movies 

        ********* Display en la pagina ***********
        
        PELICULAS EN ESTRENO:
            Kingdom of the Planet of the Apes
            Civil War
            Godzilla x Kong: The New Empire
            Bad Boys: Ride or Die
            Tarot
            Atlas
            The First Omen
            The Fall Guy
            Inside Out 2
            Battle Over Britain
            Furiosa: A Mad Max Saga
            Kung Fu Panda 4
            Boy Kills World
            4 Horsemen: Apocalypse
            Dune: Part Two
            ゴジラ-1.0
            범죄도시3
            Top Gunner: Danger Zone
            Bad Boys for Life
            Immaculate
           
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
    
    if (strUrl.includes("/movies")) {

        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
            params: {
            },
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTcwODU1OGViZWM1ZmZmZjFlYzQxZDE0ZDcxODRmMiIsInN1YiI6IjY2MzZiMjBmOWE2NGMxMDEyMzNlYzliYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8LvWUoTjKbbsMsCE2CyNyzTlV_YU_KH7s-qDDVrkkak'
            }
        };
        let strHTML="";
       
        //Solictud Axios - Peliculas en Estreno
        axios.request(options)
            .then((response) => {
                strHTML+= `<b>PELICULAS EN ESTRENO: </b><ol>`;
                console.log("Ingrese a AXIOS");
                let Movie =response.data.results;
                //console.log("Peliculas en Estreno: ", Movie);
                Movie.forEach(element => {
                    console.log("-"+element.original_title)
                    strHTML+= "<li>" + element.original_title + "</li>"
                });

                strHTML += "</ol>";
                console.log("Peliculas en Estreno HTML : ")
                console.log(strHTML);
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