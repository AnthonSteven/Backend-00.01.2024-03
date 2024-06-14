const db = require("../models");
const Color = db.color;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.descripcion) {
        res.status(400).send({
            message: "Contenido no puede estar vacio!"
        });
        return;
    }

    const color = {
        descripcion: req.body.descripcion,
        activo: 1
    };

    Color.create(color).then(data => {
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
    Color.findAll({},
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

    Color.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No puede encontrar el color con id=${id}.`
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

    Color.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Color ha sido actualizado."
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

    Color.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Color ha sido borrado correctamente."
                });
            } else {
                res.send({
                    message: `No se puede eliminar el color con id=${id} Quizás no se encontró!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el color con id=" + id
            });
        });
};

