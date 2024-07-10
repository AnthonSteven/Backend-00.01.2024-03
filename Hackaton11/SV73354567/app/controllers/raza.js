const db = require("../models");
const Raza = db.raza;

exports.create = (req, res) => {
    // Validación de entrada básica
    if (!req.body.descripcion) {
        res.status(400).send({
            message: "La descripción de la raza no puede estar vacía."
        });
        return;
    }

    const raza = {
        descripcion: req.body.descripcion
    };

    Raza.create(raza)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrió un error al crear la raza."
        });
    });
};

exports.findAll = (req, res) => {
    Raza.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrió un error al obtener las razas."
        });
    });
};