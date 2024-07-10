// models/couponModel.js

const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    code: { type: String, required: true },
    discountPercentage: { type: Number, required: true },
    validUntil: { type: Date, required: true }
});

const Coupon = mongoose.model('Coupon', CouponSchema);

module.exports = Coupon;