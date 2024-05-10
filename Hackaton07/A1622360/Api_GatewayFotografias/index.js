require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/foto', async(req, res) => {

    const keyword = req.params.keyword;
    const width = req.query.width || 400;
    const height = req.query.height || 300;
    let APIKEY = 'evBXmQEUFUUN34WiynJ6ZTdyRa69miSCVQPSjtIHJCo';
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.unsplash.com/photos/random?query=${keyword}&w=${width}&h=${height}&client_id=${APIKEY}`,
   
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
