const db = require("../models");
const Nacionalidad = db.nacionalidad;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.descripcion) {
        res.status(400).send({
            message: "El contenido no puede estar vacío.!"
        });
        return;
    }

    const nacionalidad = {
        descripcion: req.body.descripcion,
        activo: 1
    };

    Nacionalidad.create(nacionalidad).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Se produjo algún error al crear la Nacionalidad."
            });
        });
};


exports.findAll = (req, res) => {
    const descripcion = req.query.descripcion;
    console.log(descripcion)
    var condition = descripcion ? { descripcion: { [Op.like]: `%${descripcion}%` } } : null;
    console.log(condition);
    Nacionalidad.findAll({},
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

    Nacionalidad.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No puede encontrar la nacionalidad con id=${id}.`
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

    Nacionalidad.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Nacionalidad ha sido actualizada."
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

    Nacionalidad.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Nacionalidad ha sido borrado correctamente."
                });
            } else {
                res.send({
                    message: `No se puede eliminar la nacionalidad con id=${id} Quizás no se encontró!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la nacionalidad con id=" + id
            });
        });
};

