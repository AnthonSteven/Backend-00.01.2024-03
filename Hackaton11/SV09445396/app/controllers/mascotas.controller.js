const db = require("../models");
const Mascotas = db.mascotas;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Contenido no puede estar vacio!"
        });
        return;
    }

    const mascotas = {
        nombre: req.body.nombre,
        activo: 1
    };

    Mascotas.create(mascotas).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Se produjo algún error al crear la mascota."
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    console.log(nombre)
    var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
    console.log(condition);
    Mascotas.findAll({},
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

    Mascotas.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No puede encontrar la mascota con id=${id}.`
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

    Mascota.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Mascota ha sido actualizada."
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

    Mascota.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Mascota ha sido borrada correctamente."
                });
            } else {
                res.send({
                    message: `No se puede eliminar la mascota con id=${id} Quizás no se encontró!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la mascota con id=" + id
            });
        });
};

