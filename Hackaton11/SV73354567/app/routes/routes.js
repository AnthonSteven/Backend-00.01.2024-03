module.exports = app => {
    const mascota = require("../controllers/mascota.js");
    const especie = require("../controllers/especie.js");
    const raza = require("../controllers/raza.js");
    const propietario = require("../controllers/propietario.js");
    const color = require("../controllers/color.js");
    const nacionalidad = require("../controllers/nacionalidad.js");
    const vacuna = require("../controllers/vacuna.js");
    const sexo = require("../controllers/sexo.js");
    var router = require("express").Router();

    router.get("/mascota", mascota.findAll);
    router.get("/mascota/:id", mascota.findOne);
    router.delete("/mascota/:id", mascota.deleteOne);
    router.put("/mascota/:id", mascota.update);

    

    router.post("/propietario", propietario.create);
    router.get("/propietario/:id", propietario.findOne);
    router.get("/propietario", propietario.findAll);
    router.put("/propietario/:id", propietario.update);
    router.post("/propietario/mascota", propietario.createMascota);

    

    router.post("/color", color.create);
    router.get("/color", color.findAll);


    router.post("/nacionalidad", nacionalidad.create);
    router.get("/nacionalidad", nacionalidad.findAll);


    router.post("/vacuna", vacuna.create);
    router.get("/vacuna", vacuna.findAll);


    router.post("/especie", especie.create);
    router.get("/especie", especie.findAll);


    router.post("/raza", raza.create);
    router.get("/raza", raza.findAll);


    router.post("/sexo", sexo.create);
    router.get("/sexo", sexo.findAll);



    app.use('/', router);
}