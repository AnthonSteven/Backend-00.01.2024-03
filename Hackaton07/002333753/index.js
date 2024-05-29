import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
  res.send('Bienvenido al API Gateway!');
});

app.get('/github/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// http://localhost:3000/github/anakarina1928



async function getWeather(city) {
  const apiKey = 'c413d57a5a86b648a6c7a5d6a6b33845'; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

getWeather('Caracas');

// Ruta para obtener el tipo de cambio del dólar a sol peruano
app.get('/exchange/usd-to-pen', async (req, res) => {
    try {
      const response = await axios.get('https://api.frankfurter.app/latest?from=USD&to=PEN');
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // Ruta para obtener la lista de Pokémon
app.get('/pokemon/list', async (req, res) => {
    try {
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=5'; 
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

// Ruta para obtener detalles de un Pokémon específico por nombre
app.get('/pokemon/:name', async (req, res) => {
    const pokemonName = req.params.name;
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
      const response = await axios.get(url);
      const abilities = response.data.abilities.map(ability => ability.ability.name);
      res.json({ name: pokemonName, abilities: abilities });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // Ruta para obtener los personajes principales de Rick and Morty
app.get('/rickandmorty/characters', async (req, res) => {
    try {
      const url = 'https://rickandmortyapi.com/api/character';
      const response = await axios.get(url);
      const characters = response.data.results.map(character => ({
        name: character.name,
        status: character.status,
        species: character.species,
        gender: character.gender
      }));
      res.json(characters);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // Ruta para obtener el detalle de un personaje específico de Rick and Morty por ID
app.get('/rickandmorty/characters/:id', async (req, res) => {
    const characterId = req.params.id;
    try {
      const url = `https://rickandmortyapi.com/api/character/${characterId}`;
      const response = await axios.get(url);
      const character = {
        name: response.data.name,
        status: response.data.status,
        species: response.data.species,
        type: response.data.type,
        gender: response.data.gender,
        origin: response.data.origin.name,
        location: response.data.location.name,
        image: response.data.image,
        episode_count: response.data.episode.length
      };
      res.json(character);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving character: ' + error.toString() });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // Ruta para obtener el top 10 de cócteles populares
app.get('/cocktails/top', async (req, res) => {
    try {
      
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
      const response = await axios.get(url);
      const topCocktails = response.data.drinks.slice(0, 10).map(drink => ({
        name: drink.strDrink,
        category: drink.strCategory,
        alcoholic: drink.strAlcoholic,
        glass: drink.strGlass,
        instructions: drink.strInstructions,
        image: drink.strDrinkThumb
      }));
      res.json(topCocktails);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  });
  
  // Ruta para obtener un listado de productos de una tienda ficticia
app.get('/products', async (req, res) => {
    try {
      const url = 'https://fakestoreapi.com/products';
      const response = await axios.get(url);
      const products = response.data.map(product => ({
        id: product.id,
        title: product.title,
        price: product.price,
        category: product.category,
        description: product.description,
        image: product.image
      }));
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving products: ' + error.toString() });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // Ruta para obtener citas famosas
app.get('/quotes', async (req, res) => {
    try {
      const url = 'https://quotes.rest/qod'; 
      const response = await axios.get(url, {
        headers: {
          'Accept': 'application/json'
        }
      });
      const quotes = response.data.contents.quotes.map(quote => ({
        quote: quote.quote,
        author: quote.author,
        category: quote.category
      }));
      res.json(quotes);
    } catch (error) {
      if (error.response) {
        
        res.status(error.response.status).json({ error: error.response.data });
      } else {
        res.status(500).json({ error: 'Error retrieving quotes: ' + error.toString() });
      }
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  