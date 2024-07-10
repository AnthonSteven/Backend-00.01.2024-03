const db = require("../models");
const Propietario = db.propietario;
const Mascota = db.mascota;

exports.create = (req, res) => {
    
    if (!req.body.nombre) {
        res.status(400).send({
            message: "¡El contenido no puede estar vacío!"
        });
        return;
    }

    const propietario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        nacionalidadID: req.body.nacionalidad
    };

    Propietario.create(propietario)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrió algún error."
        });
    });
};

exports.findAll = (req, res) => {

    Propietario.findAll({include: ["mascotas"]})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrió algún error."
        });
    });
};

exports.findOne = (req, res) => {

    const idPropietario = req.params.id;

    Propietario.findByPk(idPropietario, {include: ["mascotas", "nacionalidad"]})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrió algún error."
        });
    });
};

exports.createMascota = (req, res) => {

    if (!req.body.nombre) {
        res.status(400).send({
            message: "¡El contenido no puede estar vacío!"
        });
        return;
    }

    const idPropietario = req.body.propietario;
    const idEspecie = req.body.especie;
    const idRaza = req.body.raza;
    const idSexo = req.body.sexo;
    const idColor = req.body.color;

    Mascota.create({
        nombre: req.body.nombre,
        fechaNacimiento: Date(),
        propietarioId: idPropietario,
        especieID: idEspecie,
        razaID: idRaza,
        sexoID: idSexo,
        colorID: idColor
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrió algún error al crear la mascota."
        });
    });
};

exports.update = (req, res) => {

    const id = req.params.id;
    const campoActualizar = req.body.campo;
    const dataActualizada = req.body.data;

    Propietario.update(
        { [campoActualizar]: dataActualizada }, // Actualiza solo el campo especificado
        { where: { id: id } }
    )
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Propietario actualizado exitosamente."
            });
        } else {
            res.send({
                message: `No se puede actualizar el propietario con id=${id}. Tal vez no se encontró o el cuerpo de la solicitud está vacío.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error actualizando el propietario con id=" + id
        });
    });
};