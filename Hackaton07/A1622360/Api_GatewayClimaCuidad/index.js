const express = require('express');
const axios  = require('axios');
const app = express();
const port = 3000;
app.use(express.json())

app.get("/clima", (req,res)=>{
    let apiKey = '6uiWnd462ZZ8vz7p2KTPmRrBux9ypZlF';
    let ubicacion = req.query.ubicacion;
    console.log(ubicacion);
  
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.tomorrow.io/v4/weather/forecast?location='+ubicacion+'&apikey='+apiKey, 
        //para ver el clima de Lima http://localhost:3000/clima?ubicacion=Lima
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        res.send(JSON.stringify(response.data));
      })
      .catch((error) => {
        res.status(500).send("Hubo un error en la aplicacion")
      });
      
  });

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});