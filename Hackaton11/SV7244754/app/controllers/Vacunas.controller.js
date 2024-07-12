const db = require("../models");
const cVacuna = db.tlb_vacuna;
const cMascota = db.tlb_mascota;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.Descripcion) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const objVacuna = {
        Descripcion: req.body.Descripcion,
    };
    cVacuna.create(objVacuna).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.findAll = (req, res) => {
    
    cVacuna.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    cVacuna.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Tutorial with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    cVacuna.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    cVacuna.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    cVacuna.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
};



exports.AddVacunaMascota = (req, res) => {
    
    const MascotaId = req.body.MascotaId;
    const VacunalId = req.body.VacunaId;

    cMascota.findByPk(MascotaId)
        .then((MascotaId_Clbk) => {
            //console.log("MascotaId_Clbk: ",MascotaId_Clbk);
            if (!MascotaId_Clbk) {
                res.status(400).send({

                    message:
                        "No se encontro la Mascota"
                });
            }
            cVacuna.findByPk(VacunalId)
                .then((VacunalId_Clbk) => {
                    //console.log("VacunalId_Clbk-1: ",VacunalId_Clbk);
                    if (!VacunalId_Clbk) {
                        console.log("Vacuna no encontrada");
                        return null;
                    }

                    MascotaId_Clbk.addVacuna(VacunalId_Clbk);
                    //VacunalId_Clbk.addcMascota(MascotaId_Clbk);
                    //console.log("VacunalId_Clbk-2: ",VacunalId_Clbk);
                    res.send(MascotaId_Clbk);
                });
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};


