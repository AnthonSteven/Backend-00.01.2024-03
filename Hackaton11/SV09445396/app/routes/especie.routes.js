module.exports = app => {
    const especie = require("../controllers/especie.controller.js");
    var router = require("express").Router();

    router.post("/", especie.create);
    router.get("/", especie.findAll);
    router.get("/:id", especie.findOne);
    router.put("/:id", especie.update);
    router.delete("/:id", especie.delete);
    
    app.use('/api/especie', router);
}