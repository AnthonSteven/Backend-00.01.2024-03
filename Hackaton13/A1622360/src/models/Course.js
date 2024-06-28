// (nombre, descripcion, img, portada, valor)

/* eslint-disable eol-last */
const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  nombre: {
    type: String,
    require: true
  },
  descripcion: {
    type: String,
    require: false
  },
  img: {
    type: String,
    require: true
  },
  portada: {
    type: String,
    require: true
  },
  valor: {
    type: Number,
    require: true
  }
}, {
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('courses', CourseSchema)