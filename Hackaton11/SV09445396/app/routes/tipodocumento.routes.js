module.exports = app => {
    const tipodocumento = require("../controllers/tipodocumento.controller.js");
    var router = require("express").Router();

    router.post("/", tipodocumento.create);
    router.get("/", tipodocumento.findAll);
    router.get("/:id", tipodocumento.findOne);
    router.put("/:id", tipodocumento.update);
    router.delete("/:id", tipodocumento.delete);

    app.use('/api/tipodocumento', router);
}