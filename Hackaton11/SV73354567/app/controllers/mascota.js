const { MACADDR } = require("sequelize");
const db = require("../models");
const Op = db.Sequelize.Op;

const Mascota = db.mascota;
const Especie = db.especie;
const Color = db.color;
const Raza = db.raza;
const Sexo = db.sexo;
const Vacuna = db.vacuna;

exports.findOne = (req , res) => {
    let id = req.params.id;

    Mascota.findByPk(id, {include: ["propietario", "raza", "sexo", "especie", "color"]})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "No se encontró la mascota."
        });
    });
};

exports.findAll = (req, res) => {
    Mascota.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "No hay mascotas."
        });
    });
}

exports.deleteOne = (req, res) => {
    let id = req.params.id;

    Mascota.destroy({
        where: { id: id }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "No hay mascota con ese ID."
        });
    });
}

exports.update = (req, res) => {
    const id = req.params.id;
    const campoActualizar = req.body.campo;
    const dataActualizada = req.body.data;

    Mascota.update(
        { [campoActualizar]: dataActualizada }, // Actualiza solo el campo especificado
        { where: { id: id } }
    )
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Mascota actualizada con éxito."
            });
        } else {
            res.send({
                message: `No se puede actualizar la mascota con id=${id}. Tal vez no se encontró o el cuerpo de la solicitud está vacío.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error actualizando la mascota con id=" + id
        });
    });
}