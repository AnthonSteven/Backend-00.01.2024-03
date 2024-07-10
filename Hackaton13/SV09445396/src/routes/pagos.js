const express = require('express')
const { getPagos, createPagos, updatePagos, deletePagos } = require('../controllers/pagos')
const router = express.Router()

router.get('/', getPagos)
router.post('/', createPagos)
router.put('/:id', updatePagos)
router.delete('/:id', deletePagos)

module.exports = router
