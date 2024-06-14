const db = require("../models");
const Direccion = db.direccion;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.ubigeo) {
        res.status(400).send({
            message: "Contenido no puede estar vacio!"
        });
        return;
    }

    const direccion = {
        ubigeo: req.body.ubigeo,
        descripcion: req.body.descripcion,
        activo: 1
    };

    Direccion.create(direccion).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Se produjo algún error al crear la direccion."
            });
        });
};


exports.findAll = (req, res) => {
    const ubigeo = req.query.ubigeo;
    console.log(ubigeo)
    var condition = ubigeo ? { ubigeo: { [Op.like]: `%${ubigeo}%` } } : null;
    console.log(condition);
    Direccion.findAll({},
     { where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Se produjo algún error."
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    Direccion.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No puede encontrar la direccion con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error con id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;

    Direccion.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Direccion ha sido actualizada."
                });
            } else {
                res.send({
                    message: `No se puede actualizar id=${id} !`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando nacionalidad con id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Direccion.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Direccion ha sido borrada correctamente."
                });
            } else {
                res.send({
                    message: `No se puede eliminar la direccion con id=${id} Quizás no se encontró!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la direccion con id=" + id
            });
        });
};




