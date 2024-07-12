
module.exports = app => {
    const rCitas = require("../controllers/Citas.controller.js");
    var router = require("express").Router();

    router.post("/UsuarioNuevo", rCitas.createUserNew);
    router.post("/UsuarioExistente", rCitas.createUserExist);
    router.get("/", rCitas.findAll);
    router.get("/:id", rCitas.findOne);
    router.put("/:id",rCitas.update);
    router.delete("/:id", rCitas.delete);
    router.delete("/", rCitas.deleteAll);
    
    app.use('/api/veterinaria/citas', router);
}