// (nombre, descripcion, img, portada, valor)

const mongoose = require('mongoose')

const PagoSchema = new mongoose.Schema({
  numtarjeta: {
    type: String,
    require: true
  },
  fechaven: {
    type: String,
    require: false
  },
  codigo: {
    type: String,
    require: true
  }
}, {
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('pagos', PagoSchema)
