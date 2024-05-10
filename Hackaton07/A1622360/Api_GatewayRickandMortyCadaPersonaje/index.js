require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/rickandmorty/character/:id', async (req, res) => {
    const characterId = req.params.id;
    const url = `https://rickandmortyapi.com/api/character/${characterId}`;

    try {
        const response = await axios.get(url);
        const character = {
            name: response.data.name,
            status: response.data.status,
            species: response.data.species,
            gender: response.data.gender,
            origin: response.data.origin.name,
            location: response.data.location.name,
            image: response.data.image
        };
        res.json(character);
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