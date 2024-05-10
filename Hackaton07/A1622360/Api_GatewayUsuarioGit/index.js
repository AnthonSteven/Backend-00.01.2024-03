const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/user/:username', async (req, res) => {
    const username = req.params.username;
    const url = `https://api.github.com/users/${username}`;

    try {
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
            res.status(500).send({ messsage: 'No se recibió respuesta del servidor' });
        } else {
            res.status(500).send({ message: 'Error al realizar la solicitud' });
        }
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
