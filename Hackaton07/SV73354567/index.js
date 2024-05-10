console.log("Inicio de la aplicación");

const http = require('http');
const axios = require('axios');
const url = require('url');

const PORT = process.env.PORT || 8080;


const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    //Api 1 -- Consultar los datos de GitHub de un usuario especifico.
    //(Datos consultados: Login, Name y id)  
    //http://localhost:8080/github/Keevin96

    if (pathname.startsWith('/github/')) {
        const username = pathname.split('/')[2];
        try {
            const { data } = await axios.get(`https://api.github.com/users/${username}`);
            const user = {
                Cuenta: data.login,
                Nombres: data.name,
                CodigoId: data.id
            };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "El usuario no existe en Github" }));
        }
    }


    // Api 2 -- Consultar el Clima de una ciudad o ubicacion especifica
    // (Datos consultados: Temperatura, Amanecer)  
    // http://localhost:8080/clima?ciudad=bogota


    else if (pathname === '/clima' && query.ciudad) {
        try {
            const options = {
                method: 'GET',
                url: 'https://weather-api138.p.rapidapi.com/weather',
                params: {
                    city_name: query.ciudad
                },
                headers: {
                    'X-RapidAPI-Key': '73d70d2c28msh7f79106bce6c25ep19a96ajsn943644966186',
                    'X-RapidAPI-Host': 'weather-api138.p.rapidapi.com'
                }
            };
            const response = await axios.request(options);
            const temperatura = parseFloat(response.data.main.temp) - 273.15;
            const amanecer = new Date(parseInt(response.data.sys.sunrise) * 1000).toISOString();

            const objRespuesta = {
                temperatura: temperatura,
                amanecer: amanecer
            };

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(objRespuesta));
        } catch (error) {
            console.error('Hubo un error en la aplicación:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Hubo un error en la aplicación' }));
        }
    }


    // Api 3 -- Consultar el tipo de cambio del dolar en Peru
    // http://localhost:8080/Tipocambio

    else if (pathname === '/Tipocambio') {
        try {
            const { data } = await axios.get("https://api.frankfurter.app/latest?from=EUR&to=USD");
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "No hay datos" }));
        }
    }


    // Api 4 -- Consultar la lista de Pokemones actual     
    // http://localhost:8080/pokemones

    else if (pathname === '/pokemones') {
        try {
            const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150");
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Error pokemon" }));
        }
    }


    // Api 5 -- Consultar los poderes de un pokemon especifico     
    // http://localhost:8080/pokemones/pikachu

    else if (pathname.startsWith('/pokemones/')) {
        const pokemon = pathname.split('/')[2];
        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data.abilities));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "No existe" }));
        }
    }

    // Api 6 -- Consultar los principales personajes de Rick and Morty     
    // http://localhost:8080/rickandmorty/

    else if (pathname === '/rickandmorty') {
        try {
            const { data } = await axios.get("https://rickandmortyapi.com/api/character");
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Error Rick and Morty" }));
        }
    }


    // Api 7 -- Consultar el detalle de cada personaje de Rick and Morty  
    // http://localhost:8080/rickandmorty/Summer%20Smith
    else if (pathname.startsWith('/rickandmorty/')) {
        const character = pathname.split('/')[2];
        try {
            const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?name=${character}`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "El personaje no existe" }));
        }
    }

    // Api 8 -- Consultar el top 10 de bebidas y cocteles 
    // http://localhost:8080/cocteles
    //probar

    else if (pathname === '/cocteles') {
        const options = {
            method: 'GET',
            url: 'https://the-cocktail-db3.p.rapidapi.com/',
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'the-cocktail-db3.p.rapidapi.com'
            }
        };
        try {
            const response = await axios.request(options);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response.data));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "No hay cocteles" }));
        }
    }


    // Api 9 -- Consultar un listado de productos de una tienda 
    // http://localhost:8080/tienda

    else if (pathname === '/tienda') {
        try {
            const { data } = await axios.get("https://fakestoreapi.com/products");
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "No hay productos" }));
        }
    }


    // Api 10 -- Consultar y traer Fotografias con un determinado tema y tamaño  
    // http://localhost:8080/foto

    else if (pathname.startsWith('/foto/')) {
        const ancho = pathname.split('/')[2];
        try {
            axios({
                method: 'get',
                url: `https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&w=${ancho}&dpr=2`,
                responseType: 'stream'
            })
                .then(function (response) {
                    response.data.pipe(fs.createWriteStream(`img/imagen_${ancho}.jpg`))
                });
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`img/imagen_${ancho}.jpg ha sido creada`);
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "No hay fotografía" }));
        }
    }

    // Api 11 -- Consultar citas famosas
    // http://localhost:8080/citas

    else if (pathname === '/citas') {
        let key = "hp08xyZUL7BojmVijGTMdc1HLfSwflcochJ1d51L";
        const options = {
            method: 'GET',
            url: 'https://quotes.rest/qod?language=en',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${key}`
            }
        };
        try {
            const response = await axios.request(options);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response.data));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Se ha excedido el límite diario (5)" }));
        }
    }


    // Api 12 -- Consultar datos ficticios de un usuario  
    // http://localhost:8080/usuario

    else if (pathname === '/usuario') {
        try {
            const { data } = await axios.get("https://randomuser.me/api/");
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "No hay datos" }));
        }
    }


    // Api 13 -- Consultar el top de peliculas de estreno   
    // http://localhost:8080/peliculas

    else if (pathname === '/peliculas') {
        let key = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2VlZThiMmI1ZjZkMWI4YjVlMzMxN2ZmNGU0MWFmNSIsInN1YiI6IjY0ZjRjMmM1N2Q0MWFhMDBmZTllMzM5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YNnpwdfAJEKAjbi26sUZnJUQR37hJgYAVgW59JtRoNs";
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${key}`
            }
        };

        try {
            const response = await axios.request(options);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response.data));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Se ha excedido el límite diario(5)" }));
        }
    }

    // Api 14 -- Consultar el detalle de una pelicula especifica
    // Damaged
    // http://localhost:8080/peliculas/1105407

    if (pathname.startsWith('/peliculas/')) {
        const id = pathname.split('/')[2];
        let key = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2VlZThiMmI1ZjZkMWI4YjVlMzMxN2ZmNGU0MWFmNSIsInN1YiI6IjY0ZjRjMmM1N2Q0MWFhMDBmZTllMzM5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YNnpwdfAJEKAjbi26sUZnJUQR37hJgYAVgW59JtRoNs";
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${key}`
            }
        };
        try {
            const response = await axios.request(options);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response.data));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Limite 5 veces al dia" }));
        }
    }


    // Api 15 -- Consultar datos especificos de Marte
    // http://localhost:8080/marte

    if (pathname === '/marte') {
        try {
            const { data } = await axios.get('https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "datos no válidos" }));
        }
    }

    else {
        // Si no se encuentra la ruta o no se proporciona una ciudad en la consulta, devolver una respuesta de ruta no encontrada
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada');
    }
});
server.listen(PORT, () => {
    console.log(`Servidor Node.js escuchando en el puerto ${PORT}`);
});