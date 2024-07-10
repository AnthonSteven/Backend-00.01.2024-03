// models/paymentModel.js

const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    paymentMethod: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' }
}, { timestamps: true });

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;