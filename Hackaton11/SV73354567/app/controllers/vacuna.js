const db = require("../models");
const Vacuna = db.vacuna;

exports.create = (req, res) => {
    // Validación de entrada básica
    if (!req.body.descripcion) {
        res.status(400).send({
            message: "La descripción de la vacuna no puede estar vacía."
        });
        return;
    }

    const vacuna = {
        descripcion: req.body.descripcion
    };

    Vacuna.create(vacuna)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrió un error al crear la vacuna."
        });
    });
};

exports.findAll = (req, res) => {
    Vacuna.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrió un error al obtener las vacunas."
        });
    });
};