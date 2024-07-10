const userModel = require('../models/User')
const { tokenSign } = require('../utils/handlerJwt')
const { encrypt, compare } = require('../utils/hashPassword')

const registerUser = async (req, res) => {
  const { username, edad, email, password, rol } = req.body
  console.log(username, edad, email, password, rol)
  try {
    const findUser = await userModel.findOne({ email })
    console.log(findUser)

    if (findUser) {
      return res.status(404).send('El usuario ya ha sido creado!')
    }
    // Encriptar la password
    const hashedPass = await encrypt(password)
    const createdUser = await userModel.create({ username, edad, email, password: hashedPass, rol })
    return res.status(200).send(createdUser)
  } catch (error) {
    return res.status(400).send({ error: 'error al registrar al usuario: ' })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const findUser = await userModel.findOne({ email })
    if (!findUser) {
      return res.status(404).send('Por favor registre al usuario')
    }
    const correct = await compare(password, findUser.password)
    if (!correct) {
      return res.status(400).send('Contrasena incorrecta')
    }
    const token = await tokenSign(findUser)
    return res.status(200).json({ findUser, token })
    // return res.status(200).json('LOGIN CORRECTO')
  } catch (error) {
    return res.status(404).json({ msg: error })
  }
}

module.exports = { registerUser, loginUser }
