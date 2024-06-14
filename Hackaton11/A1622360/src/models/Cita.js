const { DataTypes } = require('sequelize')
const sequelize = require('../Config/database')

const Mascota = require('./Mascota');

const Cita = sequelize.define('Cita', {
  fecha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mascotaId: {
    type: DataTypes.INTEGER,
    references: {
      model: Mascota,
      key: 'id'
    }
  },
})

module.exports = Cita;