const db = require("../models");
const Compras = db.compras;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Contenido no puede estar vacio!"
        });
        return;
    }

    const compras = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        cantidad: req.body.cantidad,
        fecha: req.body.fecha,
        escompletado: req.body.escompletado,
        activo: 1
    };

    Compras.create(compras).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Se produjo algún error al crear registro de compra."
            });
        });
};