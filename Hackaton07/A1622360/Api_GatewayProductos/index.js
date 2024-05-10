require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/products', async (req, res) => {
    const url = 'https://fakestoreapi.com/products';

    try {
        const response = await axios.get(url);
        const products = response.data.map(product => {
            return {
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image
            };
        });
        res.json(products);
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
