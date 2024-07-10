require('dotenv').config()
const express = require('express')

// Se agrego conexion de Base de Datos
const connectionDB = require('./config/dbConfig.js')

const app = express()

const PORT = process.env.PORT || 3000

// Configuraicon para que el serviidor entienda json
app.use(express.json())

// Conexion de BD
connectionDB()

app.get('*', (req, res) => {
  console.log('Hola mundo')
  res.status(404).send({ error: 'Verifique la ruta.' })
})

app.use('/api', require('./routes/index'))

app.listen(PORT, () => {
  console.log('El servidor se esta ejecutando: ', PORT)
})
