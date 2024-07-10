const db = require("../models");
const Color = db.color;

exports.create = (req, res) => {

    const color = {
        "descripcion" : req.body.descripcion
    }

    Color.create(color)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "ERROR."
            });
        });
}

exports.findAll = (req, res) =>{

    Color.findAll()
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "SIN COLORES"
        });
    });
}