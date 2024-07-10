const express = require('express')
const { getOrdenes, createOrdenes, updateOrdenes, deleteOrdenes } = require('../controllers/orders')
const router = express.Router()

router.get('/', getOrdenes)
router.post('/', createOrdenes)
router.put('/:id', updateOrdenes)
router.delete('/:id', deleteOrdenes)

module.exports = router
