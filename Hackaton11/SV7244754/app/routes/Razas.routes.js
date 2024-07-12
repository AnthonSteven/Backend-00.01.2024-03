
module.exports = app => {
    const rRazas = require("../controllers/Razas.controller.js");
    var router = require("express").Router();

    router.post("/", rRazas.create);
    router.get("/", rRazas.findAll);
    router.get("/:id", rRazas.findOne);
    router.put("/:id",rRazas.update);
    router.delete("/:id", rRazas.delete);
    router.delete("/", rRazas.deleteAll);

    app.use('/api/veterinaria/razas', router);
}