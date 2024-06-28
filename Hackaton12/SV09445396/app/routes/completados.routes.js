module.exports = app => {
    const completados = require("../controllers/completados.controller.js");
    var router = require("express").Router();

    router.get("/", completados.findAll);
    
    app.use('/api/completados', router);
}