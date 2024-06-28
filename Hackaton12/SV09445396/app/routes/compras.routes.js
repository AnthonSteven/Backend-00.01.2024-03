module.exports = app => {
    const compras = require("../controllers/compras.controller.js");
    var router = require("express").Router();

    router.post("/", compras.create);

    app.use('/api/compras', router);
}