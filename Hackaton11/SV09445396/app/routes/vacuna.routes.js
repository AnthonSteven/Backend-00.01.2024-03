module.exports = app => {
    const vacuna = require("../controllers/vacuna.controller.js");
    var router = require("express").Router();

    router.post("/", vacuna.create);
    router.get("/", vacuna.findAll);
    router.get("/:id", vacuna.findOne);
    router.put("/:id", vacuna.update);
    router.delete("/:id", vacuna.delete);    

    app.use('/api/vacuna', router);
}