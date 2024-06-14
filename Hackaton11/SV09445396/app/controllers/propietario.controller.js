const db = require("../models");
const Propietario = db.propietario;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Contenido no puede estar vacio!"
        });
        return;
    }

    const propietario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        documento: req.body.documento,
        telefono: req.body.telefono,
        ubigeo: req.body.ubigeo,
        activo: 1
    };

    Propietario.create(propietario).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Se produjo algún error al crear el propietario."
            });
        });
};


exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    console.log(nombre)
    var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
    console.log(condition);
    Propietario.findAll({},
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

    Propietario.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No puede encontrar el propietario con id=${id}.`
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

    Propietario.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Propietario ha sido actualizado."
                });
            } else {
                res.send({
                    message: `No se puede actualizar id=${id} !`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando el propietario con id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Propietario.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Propietario ha sido borrado correctamente."
                });
            } else {
                res.send({
                    message: `No se puede eliminar el propietario con id=${id} Quizás no se encontró!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el propietario con id=" + id
            });
        });
};

