require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/datosEspMar', async(req, res) => {

    //APIKEY creada en NASA APIKEY
    let APIKEYNASA = 'RNesqmpVeeIXL9aJeyXD7oh6oZK3tem9Ri30e1Y4';
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${APIKEYNASA}`,
   
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
