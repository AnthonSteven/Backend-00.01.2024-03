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

require("./app/routes/compras.routes")(app);
require("./app/routes/pendientes.routes")(app);
require("./app/routes/completados.routes")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


