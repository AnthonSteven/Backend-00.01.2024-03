const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController')

router.get('/cita', citaController.getCitas)
router.get('/cita/:id', citaController.getCita)
router.post('/cita', citaController.createCita)
router.put('/cita/:id', citaController.updateCita)
router.delete('/cita/:id', citaController.deleteCita)

module.exports = router;