const db = require("../models");
const Sexo = db.sexo;

exports.create = (req, res) => {
    // Validación de entrada básica
    if (!req.body.descripcion) {
        res.status(400).send({
            message: "La descripción del sexo no puede estar vacía."
        });
        return;
    }

    const sexo = {
        descripcion: req.body.descripcion
    };

    Sexo.create(sexo)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrió un error al crear el sexo."
        });
    });
};

exports.findAll = (req, res) => {
    Sexo.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrió un error al obtener los sexos."
        });
    });
};