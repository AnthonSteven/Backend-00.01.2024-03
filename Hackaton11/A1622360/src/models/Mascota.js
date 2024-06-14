const { DataTypes } = require('sequelize')
const sequelize = require('../Config/database')
const Cliente = require('./Cliente')

const Mascota = sequelize.define('Mascota', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  especie: {
    type: DataTypes.STRING,
    allowNull: true
  },
  raza: {
    type: DataTypes.STRING,
    allowNull: true
  },
  clienteId: {
    type: DataTypes.INTEGER,
    references: {
      model: Cliente,
      key: 'id'
    }
  },
})

module.exports = Mascota;