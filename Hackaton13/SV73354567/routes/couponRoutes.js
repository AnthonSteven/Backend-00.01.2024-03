// routes/couponRoutes.js

const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas de cupones (protegidas)
router.post('/', authMiddleware, couponController.createCoupon);
router.get('/', couponController.getCoupons);
router.get('/:id', couponController.getCouponById);
router.put('/:id', authMiddleware, couponController.updateCoupon);
router.delete('/:id', authMiddleware, couponController.deleteCoupon);

module.exports = router;