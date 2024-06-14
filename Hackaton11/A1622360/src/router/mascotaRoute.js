const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotaController')

router.get('/mascota', mascotaController.getMascotas)
router.get('/mascota/:id', mascotaController.getMascota)
router.post('/mascota', mascotaController.createMascota)
router.put('/mascota/:id', mascotaController.updateMascota)
router.delete('/mascota/:id', mascotaController.deleteMascota)

module.exports = router;