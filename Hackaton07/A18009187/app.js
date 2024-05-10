const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola Mundo!');
});
//Nueva ruta para obtener datos de Pokémon
app.get('/pokemons', async (req, res) => {
    try {
      // Realiza una solicitud HTTP para obtener la lista de Pokémon
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
      // Envía los datos obtenidos como respuesta JSON
      const pokemonNames = response.data.results.map(pokemon => pokemon.name);
      // Envía los nombres de los Pokémon como respuesta JSON
      res.json(pokemonNames);
    } catch (error) {
      // Maneja errores de la solicitud HTTP
      res.status(500).send('Error al obtener datos de Pokémon');
    }
  });
  // Nueva ruta para obtener datos de GitHub de un usuario especifico
  app.get('/usuario-github', async (req, res) => {
    try {
      // Realiza una solicitud HTTP para obtener la lista de github
      const response = await axios.get('https://api.github.com/search/users?q=milone1');
      res.json(response.data);
    } catch (error) {
      // Maneja errores de la solicitud HTTP
      res.status(500).send('Error al obtener datos de Usuario github');
    }
  });
 // Nueva ruta para obtener datos de personajes de rick and morty
 app.get('/rickandmorty', async (req, res) => {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character');
      const personajesRickAndMorty = response.data.results.map(rick => rick.name);
      res.json(personajesRickAndMorty);
    } catch (error) {
      res.status(500).send('Error al obtener datos de Pokémon');
    }
  });
  // Nueva ruta para obtener los poderes de un personajes de pokemon: charizard
  app.get('/pokemon/charizard', async (req, res) => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon/6/');
      const charizard = response.data.abilities.map(pokemon => pokemon.ability.name);
      res.json(charizard);
    } catch (error) {
      res.status(500).send('Error al obtener datos de Pokémon');
    }
  });
    // Nueva ruta para obtener the Astronomy Picture of the Day
    app.get('/picture/of/the/day', async (req, res) => {
        try {
            const response = await axios.get('https://apod.nasa.gov/apod/image/2405/BhShredder_NASA_3482.jpg', { responseType: 'arraybuffer' });
            let buffer = Buffer.from(response.data, 'binary').toString('base64');
            res.redirect('data:image/jpeg;base64,' + buffer);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener datos de la imagen');
        }
    });





  app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
app.get('/api', (req, res) => {
    res.json({ mensaje: '¡Bienvenido a la API!' });
  });