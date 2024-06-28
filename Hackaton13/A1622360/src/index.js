/* eslint-disable eol-last */
require('dotenv').config()
const express = require('express')
const connectionDB = require('./config/dbConfig.js')
const app = express()

const PORT = process.env.PORT || 3000
// configuraicon para que el servdior entienda json
app.use(express.json())

// conexion con la base de datos.
connectionDB()

// usar las rutas dynamicas
app.use('/api', require('./routes/index.js'))

app.use('*', (req, res) => {
  res.status(404).send({ error: 'verifique la ruta.' })
})

app.listen(PORT, () => {
  console.log('The server is running on PORT: ', PORT)
})
