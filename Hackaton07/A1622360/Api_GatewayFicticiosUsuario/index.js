require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;
app.get('/usuarioFicticio', async(req, res) => {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://randomuser.me/api/',
      
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
