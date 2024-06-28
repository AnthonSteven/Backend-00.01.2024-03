const mongoose = require('mongoose')

const OrdersSchema = new mongoose.Schema({
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
  valor: {
    type: Number,
    require: true
  }
}, {
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('orders', OrdersSchema)