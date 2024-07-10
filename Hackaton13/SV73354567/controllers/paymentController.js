// controllers/paymentController.js

exports.processPayment = (req, res) => {
    try {
        // Aquí iría la lógica para procesar el pago. Por ahora, simulamos un pago exitoso.
        const { orderId, amount } = req.body;

        // Simulación de procesamiento de pago
        res.status(200).json({ message: "Pago procesado exitosamente", orderId, amount });
    } catch (error) {
        res.status(500).json({ message: "Error al procesar el pago" });
    }
};