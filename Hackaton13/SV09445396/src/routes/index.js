const fs = require('fs')
const express = require('express')
const removeExtension = require('../utils/removeExtension')

const router = express.Router()

const pathRoute = `${__dirname}`
console.log(pathRoute)

// console.log(fs.readdirSync(pathRoute))

fs.readdirSync(pathRoute).filter((file) => {
  // console.log(file)

  // console.log(file.split('.').shift())
  const fileNameWithOutExt = removeExtension(file)
  console.log(fileNameWithOutExt)

  // Quitar la ruta index
  const skip = ['index'].includes(fileNameWithOutExt)

  if (!skip) {
    router.use(`/${fileNameWithOutExt}`, require(`./${fileNameWithOutExt}`))
    // console.log(`/${fileNameWithOutExt}`, `./${fileNameWithOutExt}`)
  }
})

module.exports = router
