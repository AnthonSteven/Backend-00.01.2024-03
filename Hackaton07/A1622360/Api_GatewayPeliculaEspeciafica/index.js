require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;
const tmdbApiKey = process.env.TMDB_API_KEY; 

app.get('/peliculasEstreno', async(req, res) => {

    
    let APIKEYE = '9e5e64c28d27f5229b1770841a11d3a7';
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEYE}`,
   
      Headers: {}
    }
  
    axios.request(config)
    .then((response) => {
      res.send(JSON.stringify(response.data));
    })
    .catch((error) => {
      res.status(500).send("Hubo un error en la aplicacion")
    });
  })

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});