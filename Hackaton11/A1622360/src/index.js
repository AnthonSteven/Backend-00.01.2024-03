const express = require('express')
const sequelize = require('./Config/database')
const clienteRouter = require('./router/clienteRoute')
const mascotaRouter = require('./router/mascotaRoute')
const citaRouter = require('./router/citaRoute')

const app = express();

app.use(express.json())

// RUTAS A USAR;

app.use('/api', clienteRouter)
app.use('/api', mascotaRouter)
app.use('/api', citaRouter)

sequelize.sync().then( () => {

  app.listen(3000, () => {
    console.log('server is runnig');
  })

}).catch((error) => {
  console.error('Error al sincronizar con la base de datos.', error)
})