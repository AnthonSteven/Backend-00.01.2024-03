// (nombre, descripcion, img, portada, valor)

const mongoose = require('mongoose')

const OrdenesSchema = new mongoose.Schema({
  numorden: {
    type: String,
    require: true
  },
  nomcurso: {
    type: String,
    require: false
  },
  cantidad: {
    type: Number,
    require: true
  }
}, {
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('ordenes', OrdenesSchema)
