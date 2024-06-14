const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");


const sequelize = new Sequelize('veterinariadb', 'root', 'P@$$w0rd', {
    host: 'localhost',
    dialect: 'mysql', 
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.usuarios = require("./tbl_usuario.model.js")(sequelize, Sequelize);
db.tipodocumento = require("./tbl_tipo_documento.model.js")(sequelize, Sequelize);
db.nacionalidad = require("./tbl_nacionalidad.model.js")(sequelize, Sequelize);
db.direccion = require("./tbl_direccion.model.js")(sequelize, Sequelize);
db.raza = require("./tbl_raza.model.js")(sequelize, Sequelize);
db.especie = require("./tbl_especie.model.js")(sequelize, Sequelize);
db.color = require("./tbl_color.model.js")(sequelize, Sequelize);
db.vacuna = require("./tbl_vacuna.model.js")(sequelize, Sequelize);
db.propietario = require("./tbl_propietario.model.js")(sequelize, Sequelize);
db.mascotas = require("./tbl_mascotas.model.js")(sequelize, Sequelize);

// Relacion de tablas de "tbl_propietario" con:
//  tbl_nacionalidad, tbl_tipodocumento, tbl_direccion
db.nacionalidad.hasMany(db.propietario, { as: "propietario" });
db.propietario.belongsTo(db.nacionalidad, {
    foreignKey: "IdNacionalidad",
    as: "nacionalidad",
});

db.tipodocumento.hasMany(db.propietario, { as: "propietario" });
db.propietario.belongsTo(db.tipodocumento, {
    foreignKey: "IdTipoDocumento",
    as: "tipodocumento",
});

db.direccion.hasMany(db.propietario, { as: "propietario" });
db.propietario.belongsTo(db.direccion, {
    foreignKey: "IdUbigeo",
    as: "direccion",
});


// Relacion de tablas de "tbl_mascota" con:
//  tbl_raza, tbl_especie, tbl_color,tbl_propietario
db.raza.hasMany(db.mascotas, { as: "mascotas" });
db.mascotas.belongsTo(db.raza, {
    foreignKey: "IdRaza",
    as: "raza",
});

db.especie.hasMany(db.mascotas, { as: "mascotas" });
db.mascotas.belongsTo(db.especie, {
    foreignKey: "IdEspecie",
    as: "especie",
});

db.color.hasMany(db.mascotas, { as: "mascotas" });
db.mascotas.belongsTo(db.color, {
    foreignKey: "IdColor",
    as: "color",
});

db.propietario.hasMany(db.mascotas, { as: "mascotas" });
db.mascotas.belongsTo(db.propietario, {
    foreignKey: "IdPropietario",
    as: "propietario",
});

// Relacion de tablas "Tbl_mascota" con "Tbl_vacuna"
db.vacuna.belongsToMany(db.mascotas, {
  through: "tbl_mascota_vacuna",
  as: "mascotas",
  foreignKey: "IdVacuna",
});

db.mascotas.belongsToMany(db.vacuna, {
  through: "tbl_mascota_vacuna",
  as: "vacuna",
  foreignKey: "IdMascota",
});

module.exports = db;


