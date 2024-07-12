const db = require("../models");
const T_propietario = db.tlb_propietario;
const T_mascota = db.tlb_mascota;
const T_cita = db.tlb_cita;
const T_color = db.tlb_color;
const T_raza = db.tlb_raza;
const T_especie = db.tlb_especie;
const T_vacuna = db.tlb_vacuna;


exports.createUserNew = async (req, res) => {

    const ObjPropietario = {
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        Documento: req.body.Documento,
        Telefono: req.body.Telefono
    }

    const ObjMascota = {
        Nombre: req.body.NombreMascota,
        tlbEspecieId: req.body.EspecieId,
        tlbRazaId: req.body.RazaId,
        tlbColorId: req.body.ColorId
    }

    const CitaPropietarioId = await T_propietario.create(ObjPropietario)
        .then(data => {
            console.log("Registro Propietario creado:",data);
            console.log("Id Propietario:",data.dataValues.id);
            return data.dataValues.id;
            //res.send(data);
        })

        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });


    const CitaMascotaId = await T_mascota.create(ObjMascota)
        .then(data => {
            console.log("Registro mascota creado:",data);
            console.log("Id Mascota:",data.dataValues.id);
            return data.dataValues.id;
            //res.send(data);
        })

        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });


    const ObjCita = {
        
        Codigo_Cita: req.body.CodigoCita,
        Motivo_Cita: req.body.MotivoCita,
        tlbPropietarioId: CitaPropietarioId,
        tlbMascotumId: CitaMascotaId
    }

    console.log("ObjPropietario",ObjPropietario);
    console.log("ObjMascota",ObjMascota);
    console.log("ObjCita",ObjCita);

    await T_cita.create(ObjCita)
        .then(data => {
            res.send(data);
            console.log("Registro cita creado:",data);
        })

        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });   

};



exports.createUserExist = async (req, res) => {

    const ObjMascota = {
        Nombre: req.body.NombreMascota,
        tlbEspecieId: req.body.EspecieId,
        tlbRazaId: req.body.RazaId,
        tlbColorId: req.body.ColorId
    }

    const CitaPropietarioDoc = req.body.Documento
    
    const CitaPropietarioId=await T_propietario.findAll({where: { Documento: CitaPropietarioDoc }})
        .then(data => {
                if (data) {
                    //res.send(data);
                    console.log("-----> Propietario id Encontrado: ",data[0].dataValues.id)
                    return data[0].dataValues.id;
                } else {
                    /*res.status(404).send({
                        message: `Cannot find Tutorial with id=${id}.`
                    });*/
                }
            })
        .catch(err => {
                res.status(500).send({
                    message: "Error retrieving Tutorial with id=" 
                });
            });


    const CitaMascotaId = await T_mascota.create(ObjMascota)
        .then(data => {
            console.log("Registro mascota creado:",data);
            console.log("Id Mascota:",data.dataValues.id);
            return data.dataValues.id;
            
        })

        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });


    const ObjCita = {
        
        Codigo_Cita: req.body.CodigoCita,
        Motivo_Cita: req.body.MotivoCita,
        tlbPropietarioId: CitaPropietarioId,
        tlbMascotumId: CitaMascotaId
    }

    
    console.log("ObjMascota",ObjMascota);
    console.log("ObjCita",ObjCita);

    await T_cita.create(ObjCita)
        .then(data => {
            res.send(data);
            console.log("Registro cita creado:",data);
        })

        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });   

};



exports.findAll = (req, res) => {
    T_cita.findAll({
       attributes: ["id","Codigo_Cita", "Motivo_Cita","createdAt","updatedAt"],
        include: [
            {
                model: T_propietario,
                as: "Propietario",
                attributes: ["id","Nombre","Apellido","Documento","Telefono"],
            },
            {
                model: T_mascota,
                as: "Mascota",
                attributes: ["id", "Nombre"],
                include: [
                    {
                        model: T_especie,
                        as: "Especie",
                        attributes: ["id","Descripcion"],
                    },
                    {
                        model: T_raza,
                        as: "Raza",
                        attributes: ["id","Descripcion"],
                    },
                    {
                        model: T_color,
                        as: "Color",
                        attributes: ["id","Descripcion"],
                    },
                    {
                        model: T_vacuna,
                        as: "Vacunas",
                        attributes: ["id","Descripcion"],
                        through: {
                            attributes: [],
                        }
                    }

                ]
            },
            
        ],
    })
    .then(data => {
            res.send(data);
        })
    .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};



exports.findOne = (req, res) => {
    const id = req.params.id;

    T_cita.findByPk(id,{
        attributes: ["id","Codigo_Cita", "Motivo_Cita","createdAt","updatedAt"],
        include: [
            {
                model: T_propietario,
                as: "Propietario",
                attributes: ["Nombre","Apellido","Documento","Telefono"],
            },
            {
                model: T_mascota,
                as: "Mascota",
                attributes: ["id", "Nombre"],
                include: [
                    {
                        model: T_especie,
                        as: "Especie",
                        attributes: ["id","Descripcion"],
                    },
                    {
                        model: T_raza,
                        as: "Raza",
                        attributes: ["id","Descripcion"],
                    },
                    {
                        model: T_color,
                        as: "Color",
                        attributes: ["id","Descripcion"],
                    },
                    {
                        model: T_vacuna,
                        as: "Vacunas",
                        attributes: ["id","Descripcion"],
                        through: {
                            attributes: [],
                        }
                    }

                ]
            },
            
        ],
    })
    
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



exports.update = async (req, res) => {
    const idCita = req.params.id;

    const ObjPropietario = {
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        Documento: req.body.Documento,
        Telefono: req.body.Telefono
    }

    const ObjMascota = {
        Nombre: req.body.NombreMascota,
        tlbEspecieId: req.body.EspecieId,
        tlbRazaId: req.body.RazaId,
        tlbColorId: req.body.ColorId
    }

   

    const [idPorpietario,idMascota]=await T_cita.findByPk(idCita)
        .then(data => {
                if (data) {
                    res.send(data);
                    console.log("Dato Encontrado: ",data)
                    return [data.dataValues.tlbPropietarioId,data.dataValues.tlbMascotumId]
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
    
    const ObjCita = {
        Codigo_Cita: req.body.CodigoCita,
        Motivo_Cita: req.body.MotivoCita,
        //tlbPropietarioId: idPorpietario,
        //tlbMascotumId: idMascota
        }

    console.log("idPorpietario: ",idPorpietario);
    console.log("idMascota: ",idMascota);
    

    T_cita.update(ObjCita, {
        where: { id: idCita }
    })
        .then(num => {
            if (num == 1) {
                console.log(`Cita was updated successfully!`);
                console.log("Numero Cita: ",num);
            } 
            else {
                console.log(`Error updating Tutorial with id= ${idCita}`);
            }
        })
        .catch(err => {
            console.log(`Cannot update Tutorial with id=${idCita}. Maybe Tutorial was not found or req.body is empty!`);
        });

    T_propietario.update(ObjPropietario, {
        where: { id: idPorpietario }})
        .then(num => {
            if (num == 1) {
                console.log(`Propietario was updated successfully!`);
                console.log("Numero Propietario: ",num);
                
            } else {
                
                console.log(`Error updating Tutorial with id= ${idPorpietario}`);
            }
        })
        .catch(err => {
            console.log(`Cannot update Tutorial with id=${idPorpietario}. Maybe Tutorial was not found or req.body is empty!`);
        });
    

    T_mascota.update(ObjMascota, {
        where: { id: idMascota }
        })
            .then(num => {
                if (num == 1) {
                    console.log(`Mascota was updated successfully!`);
                    console.log("Numero Mascota: ",num);
                    
                    
                } else {
                    console.log(`Error updating Mascota with id= ${idMascota}`);
                }
            })
            .catch(err => {
                console.log(`Cannot update Mascota with id=${idMascota}. Maybe Tutorial was not found or req.body is empty!`);
            });
};



exports.delete = async (req, res) => {
    const idCita = req.params.id;

    const [idPropietario,idMascota]=await T_cita.findByPk(idCita)
        .then(data => {
                if (data) {
                    res.send(data);
                    console.log("Dato Encontrado: ",data)
                    return [data.dataValues.tlbPropietarioId,data.dataValues.tlbMascotumId]
                } else {
                    res.status(404).send({
                        message: `Cannot find Tutorial with id=${idCita}.`
                    });
                }
            })
        .catch(err => {
                res.status(500).send({
                    message: "Error retrieving Tutorial with id=" + idCita
                });
            });
    

    console.log("idPorpietario: ",idPropietario);
    console.log("idMascota: ",idMascota);
    

    T_cita.destroy({where: { id: idCita }})
        .then(num => {
            if (num == 1) {
                console.log(`Cita was Deleted successfully!`);
                console.log("Numero Cita: ",num);
            } 
            else {
                console.log(`Error Deleting Cita with id= ${idCita}`);
            }
        })
        .catch(err => {
            console.log(`Cannot Delete Cita with id=${idCita}. Maybe Tutorial was not found or req.body is empty!`);
        });


    T_propietario.destroy({where: { id: idPropietario }})
        .then(num => {
            if (num == 1) {
                console.log(`Propietario was updated successfully!`);
                console.log("Numero Propietario: ",num);
                
            } else {
                
                console.log(`Error updating Tutorial with id= ${idPropietario}`);
            }
        })
        .catch(err => {
            console.log(`Cannot update Tutorial with id=${idPropietario}. Maybe Tutorial was not found or req.body is empty!`);
        });
    

    T_mascota.destroy({where: { id: idMascota }})
        .then(num => {
            if (num == 1) {
                console.log(`Mascota was updated successfully!`);
                console.log("Numero Mascota: ",num);
                
                
            } else {
                console.log(`Error updating Tutorial with id= ${idMascota}`);
            }
        })
        .catch(err => {
            console.log(`Cannot update Tutorial with id=${idMascota}. Maybe Tutorial was not found or req.body is empty!`);
        });
};



exports.deleteAll = async (req, res) => {
  
    await T_cita.destroy({where: {  }})
        .then(num => {
            if (num > 0) {
                console.log(`Cita was Deleted successfully!`);
                console.log("Numero Cita: ",num);
            } 
            else {
                console.log(`Error Deleting Cita`);
            }
        })
        .catch(err => {
            console.log(`Cannot Delete Cita. Maybe Tutorial was not found or req.body is empty!`);
        });


    await T_propietario.destroy({where: {  }})
        .then(num => {
            if (num > 0) {
                console.log(`Propietario was Deleted successfully!`);
                console.log("Numero Propietario: ",num);
                
            } else {
                
                console.log(`Error Deleting Propietario `);
            }
        })
        .catch(err => {
            console.log(`Cannot Delete Propietario. Maybe Tutorial was not found or req.body is empty!`);
        });
    

    await T_mascota.destroy({where: {  }})
        .then(num => {
            if (num > 0) {
                console.log(`Mascota was Deleted successfully!`);
                console.log("Numero Mascota: ",num);
                res.send(JSON.stringify({Status200:"Registros Borrado Correctamente"}));
                
            } else {
                console.log(`Error Deleting Mascota`);
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while Deleting Cita."
            });
            console.log(`Cannot Delete Mascota. Maybe Tutorial was not found or req.body is empty!`);
        });
};