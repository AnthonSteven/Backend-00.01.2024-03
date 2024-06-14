const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const db = require("./app/models");


db.sequelize.sync()
    .then(() => {
        console.log("Sincronizando db.");
    })
    .catch((err) => {
        console.log("Falla en sincronizacion de db: " + err.message);
    });


app.get("/", (req, res) => {
    res.json({ message: "Bienvenido" });
});


require("./app/routes/usuario.routes")(app);
require("./app/routes/tipodocumento.routes")(app);
require("./app/routes/nacionalidad.routes")(app);
require("./app/routes/direccion.routes")(app);
require("./app/routes/raza.routes")(app);
require("./app/routes/especie.routes")(app);
require("./app/routes/color.routes")(app);
require("./app/routes/vacuna.routes")(app);
require("./app/routes/propietario.routes")(app);
require("./app/routes/mascotas.routes")(app);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


