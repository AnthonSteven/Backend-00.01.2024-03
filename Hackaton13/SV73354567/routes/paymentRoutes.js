// routes/paymentRoutes.js

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas de pagos (protegidas)
router.post('/', authMiddleware, paymentController.processPayment);

module.exports = router;