// controllers/orderController.js

const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        const { userId, courseId, amount } = req.body;

        const newOrder = new Order({ userId, courseId, amount });

        await newOrder.save();

        res.status(201).json({ message: "Orden creada exitosamente", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la orden" });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las órdenes" });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la orden" });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        res.json({ message: "Orden actualizada exitosamente", order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la orden" });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        res.json({ message: "Orden eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la orden" });
    }
};