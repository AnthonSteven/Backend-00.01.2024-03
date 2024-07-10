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
    console.log("Base de datos sincronizada.");
  })
  .catch((err) => {
    console.log("Error al sincronizar la base de datos: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la aplicación de pachaqtec." });
});

require("./app/routes/routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}.`);
});
