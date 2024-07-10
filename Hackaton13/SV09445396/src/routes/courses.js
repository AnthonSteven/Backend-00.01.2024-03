const express = require('express')
const { getCourses, createCourses, updateCourses, deleteCourses } = require('../controllers/courses')
const router = express.Router()
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
//
const checkAuth = require('../middleware/auth')
//
const cloudinary = require('cloudinary').v2

// Configuracion de Cloudinary
cloudinary.config({
  cloud_name: 'dciwjgyhx',
  api_key: '535349272662854',
  api_secret: '_RHqZ33brhPqXoFr4vtUX12c0Lo' // Credentials
})

// Almacenamiento de cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'png']
  }
})

const parser = multer({ storage })

router.get('/', getCourses)
router.post('/', checkAuth, parser.single('image'), createCourses)
router.put('/:id', updateCourses)
router.delete('/:id', deleteCourses)

module.exports = router
