require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.EXCHANGERATE_API_KEY;

app.get('/CambioModena', async (req, res) => {
    const url = `https://api.exchangerate-api.com/v4/latest/USD`;

    try {
        const response = await axios.get(url);
        const rate = response.data.rates.PEN; 
        res.send(`El tipo de cambio del dólar a soles peruanos es: ${rate}`);
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