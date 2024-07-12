
module.exports = app => {
    const rEspecies = require("../controllers/Especies.controller.js");
    var router = require("express").Router();

    router.post("/", rEspecies.create);
    router.get("/", rEspecies.findAll);
    router.get("/:id", rEspecies.findOne);
    router.put("/:id",rEspecies.update);
    router.delete("/:id", rEspecies.delete);
    router.delete("/", rEspecies.deleteAll);

    app.use('/api/veterinaria/especies', router);
}