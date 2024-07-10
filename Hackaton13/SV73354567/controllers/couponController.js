// controllers/couponController.js

const Coupon = require('../models/Coupon');

exports.createCoupon = async (req, res) => {
    try {
        const { code, discount } = req.body;

        const newCoupon = new Coupon({ code, discount });

        await newCoupon.save();

        res.status(201).json({ message: "Cupón creado exitosamente", coupon: newCoupon });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el cupón" });
    }
};

exports.getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();

        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los cupones" });
    }
};

exports.getCouponById = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);

        if (!coupon) {
            return res.status(404).json({ message: "Cupón no encontrado" });
        }

        res.json(coupon);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el cupón" });
    }
};

exports.updateCoupon = async (req, res) => {
    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedCoupon) {
            return res.status(404).json({ message: "Cupón no encontrado" });
        }

        res.json({ message: "Cupón actualizado exitosamente", coupon: updatedCoupon });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el cupón" });
    }
};

exports.deleteCoupon = async (req, res) => {
    try {
        const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);

        if (!deletedCoupon) {
            return res.status(404).json({ message: "Cupón no encontrado" });
        }

        res.json({ message: "Cupón eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el cupón" });
    }
};