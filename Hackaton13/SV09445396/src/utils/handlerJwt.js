/* eslint-disable eol-last */
const jwt = require('jsonwebtoken')

const tokenSign = async (user) => {
  return jwt.sign(
    {
      _id: user._id,
      rol: user.rol[0],
      email: user.email
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '1h'
    }
  )
}

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY)
  } catch (error) {
    return null
  }
}

const decodeToken = (token) => {
  return jwt.decode(token, null)
}

module.exports = { tokenSign, verifyToken, decodeToken }