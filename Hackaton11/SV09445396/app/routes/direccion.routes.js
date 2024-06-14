module.exports = app => {
    const direccion = require("../controllers/direccion.controller.js");
    var router = require("express").Router();

    router.post("/", direccion.create);
    router.get("/", direccion.findAll);
    router.get("/:id", direccion.findOne);
    router.put("/:id", direccion.update);
    router.delete("/:id", direccion.delete);

    app.use('/api/direccion', router);
}