module.exports = app => {
    const color = require("../controllers/color.controller.js");
    var router = require("express").Router();

    router.post("/", color.create);
    router.get("/", color.findAll);
    router.get("/:id", color.findOne);
    router.put("/:id", color.update);
    router.delete("/:id", color.delete);
    
    app.use('/api/color', router);
}