const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  edad: {
    type: Number,
    require: false
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  rol: {
    type: ['admin', 'user'],
    default: 'user'
  }
}, {
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('users', UserSchema)
