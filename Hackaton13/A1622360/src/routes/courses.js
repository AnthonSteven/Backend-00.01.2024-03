/* eslint-disable eol-last */
const express = require('express')
const router = express.Router()
const { getCourses, createCourses, updateCourses, deleteCourses } = require('../controllers/courses')
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const checkAuth = require('../middleware/auth')
const cloudinary = require('cloudinary').v2

// Configurar Cloudinary
cloudinary.config({
  cloud_name: 'dzhjajneh',
  api_key: '667342425277889',
  api_secret: 'EeHSnBtUVsg7ZjyeL60u9Q83rU0'
})

// storage of cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'png']
  }
})
const parser = multer({ storage })

router.get('/', getCourses)
router.post('/', checkAuth, parser.fields([{ name: 'image', maxCount: 1 }, { name: 'portada', maxCount: 1 }]), createCourses)
router.put('/:id', updateCourses)
router.delete('/:id', deleteCourses)

module.exports = router