/* eslint-disable eol-last */
const fs = require('fs')
const express = require('express')
const removeExtension = require('../utils/removeExtension')

const router = express.Router()

// Ruta donde se encuentra el diuretorio padre
const pathRoute = `${__dirname}`

// eslint-disable-next-line array-callback-return
fs.readdirSync(pathRoute).filter((file) => {
  // console.log(file.split('.').shift() )
  const fileNameWithOutExt = removeExtension(file)

  const skip = ['index'].includes(fileNameWithOutExt)
  if (!skip) {
    router.use(`/${fileNameWithOutExt}`, require(`./${fileNameWithOutExt}`))
  }
})

module.exports = router