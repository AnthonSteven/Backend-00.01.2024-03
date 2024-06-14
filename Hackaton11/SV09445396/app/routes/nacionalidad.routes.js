module.exports = app => {
    const nacionalidad = require("../controllers/nacionalidad.controller.js");
    var router = require("express").Router();

    router.post("/", nacionalidad.create);
    router.get("/", nacionalidad.findAll);
    router.get("/:id", nacionalidad.findOne);
    router.put("/:id", nacionalidad.update);
    router.delete("/:id", nacionalidad.delete);

    app.use('/api/nacionalidad', router);
}