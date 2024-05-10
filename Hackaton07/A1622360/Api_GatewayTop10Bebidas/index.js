require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/Bebidas/top', async (req, res) => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

    try {
        const response = await axios.get(url);
        const topCocktails = response.data.drinks.slice(0, 10).map(drink => {
            return {
                name: drink.strDrink,
                category: drink.strCategory,
                instructions: drink.strInstructions,
                image: drink.strDrinkThumb,
                ingredients: [
                    drink.strIngredient1,
                    drink.strIngredient2,
                    drink.strIngredient3, 
                ].filter(Boolean) 
            };
        });
        res.json(topCocktails);
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
