module.exports = app => {
    const mascotas = require("../controllers/mascotas.controller.js");
    var router = require("express").Router();

    router.post("/", mascotas.create);
    router.get("/", mascotas.findAll);
    router.get("/:id", mascotas.findOne);
    router.put("/:id", mascotas.update);
    router.delete("/:id", mascotas.delete);
    
    app.use('/api/mascotas', router);
}