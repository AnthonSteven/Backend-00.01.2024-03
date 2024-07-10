const { verifyToken } = require('../utils/handlerJwt')

const checkAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(200).send('Necesita llenar un token.')
    }

    const token = req.headers.authorization.split(' ').pop()
    const tokenData = await verifyToken(token)
    // console.log(tokenData)
    if (tokenData.rol === 'admin') {
      next()
    } else {
      return res.status(404).send('Esta ruta es solo para administradores')
    }
  } catch (error) {
    return res.status(405).send(error)
  }
}

module.exports = checkAuth
