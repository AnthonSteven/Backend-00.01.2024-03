
module.exports = app => {
    const rVacunas = require("../controllers/Vacunas.controller.js");
    var router = require("express").Router();

    router.post("/", rVacunas.create);
    router.get("/", rVacunas.findAll);
    router.get("/:id", rVacunas.findOne);
    router.put("/:id",rVacunas.update);
    router.delete("/:id", rVacunas.delete);
    router.delete("/", rVacunas.deleteAll);

    router.post("/mascota", rVacunas.AddVacunaMascota);

    app.use('/api/veterinaria/vacunas', router);
}