const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController')

router.get('/cliente', clienteController.getClientes)
router.get('/cliente/:id', clienteController.getCliente)
router.post('/cliente', clienteController.createCliente)
router.put('/cliente/:id', clienteController.updateCliente)
router.delete('/cliente/:id', clienteController.deleteClient)

module.exports = router;