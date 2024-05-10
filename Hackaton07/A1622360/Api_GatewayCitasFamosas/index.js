require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/citasfamosas', async(req, res) => {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.quotable.io/quotes',
      
      Headers: {}
    }
  
    axios.request(config)
    .then((response) => {
      res.send(JSON.stringify(response.data.results));
    })
    .catch((error) => {
      res.status(500).send("Hubo un error en la aplicacion")
    });
  })

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
