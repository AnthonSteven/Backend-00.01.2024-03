require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;
app.get('/peliculas/:id', async(req, res) => {

    const id = req.params.id;
    
    let APIKEYESP = '9e5e64c28d27f5229b1770841a11d3a7';
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEYESP}`,
        // id : 823464
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