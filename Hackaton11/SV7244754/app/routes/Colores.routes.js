
module.exports = app => {
    const rColores = require("../controllers/Colores.controller.js");
    var router = require("express").Router();

    router.post("/", rColores.create);
    router.get("/", rColores.findAll);
    router.get("/:id", rColores.findOne);
    router.put("/:id",rColores.update);
    router.delete("/:id", rColores.delete);
    router.delete("/", rColores.deleteAll);

    app.use('/api/veterinaria/colores', router);
}