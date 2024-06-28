const db = require("../models");
const Compras = db.compras;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {

    var condition = {escompletado:1};  // COMPLETADO: escompletado=1
    console.log(condition);

    Compras.findAll(
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