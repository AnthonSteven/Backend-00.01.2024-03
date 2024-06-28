module.exports = app => {
    const pendientes = require("../controllers/pendientes.controller.js");
    var router = require("express").Router();

    router.get("/", pendientes.findAll);
    
    app.use('/api/pendientes', router);
}