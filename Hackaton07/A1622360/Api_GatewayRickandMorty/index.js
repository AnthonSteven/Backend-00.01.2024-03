require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/rickandmorty/characters', async (req, res) => {
    const url = 'https://rickandmortyapi.com/api/character';

    try {
        const response = await axios.get(url);
        const characters = response.data.results.map(character => {
            return {
                name: character.name,
                status: character.status,
                species: character.species,
                image: character.image
            };
        });
        res.json(characters);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
            res.status(500).send('Error: No se recibió respuesta del servidor de la API');
        } else {
            res.status(500).send('Error interno del servidor');
        }
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
