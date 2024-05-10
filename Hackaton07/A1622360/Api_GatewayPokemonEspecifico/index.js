require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/pokemon/:name', async (req, res) => {
    const pokemonName = req.params.name;
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    try {
        const response = await axios.get(url);
        const abilities = response.data.abilities.map(ability => ability.ability.name);
        res.json({ 
            name: pokemonName,
            abilities: abilities 
        });
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
