const config = require("../db/config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize('Veterinaria', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql', 
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.propietario = require("./propietario.js")(sequelize, Sequelize);
db.mascota = require("./mascota.js")(sequelize, Sequelize);

db.color = require("./color.js")(sequelize, Sequelize);
db.especie = require("./especie.js")(sequelize, Sequelize);
db.raza = require("./raza.js")(sequelize, Sequelize);
db.sexo = require("./sexo.js")(sequelize, Sequelize);
db.vacuna = require("./vacuna.js")(sequelize, Sequelize);
db.nacionalidad = require("./nacionalidad.js")(sequelize, Sequelize);

db.propietario.hasMany(db.mascota, { as: "mascotas"});
db.mascota.belongsTo(db.propietario, {
  foreignKey: "propietarioId",
  as: "propietario",
});


db.nacionalidad.hasOne(db.propietario, { as : "propietario"});
db.propietario.belongsTo(db.nacionalidad, {
    foreignKey : "nacionalidadID",
    as : "nacionalidad"
});


db.especie.hasOne(db.mascota, {as : "mascota"});
db.mascota.belongsTo(db.especie, {
    foreignKey : "especieID",
    as : "especie"
});


db.raza.hasOne(db.mascota, {as : "mascota"});
db.mascota.belongsTo(db.raza, {
    foreignKey : "razaID",
    as : "raza"
});


db.sexo.hasOne(db.mascota, {as : "mascota"});
db.mascota.belongsTo(db.sexo, {
    foreignKey : "sexoID",
    as : "sexo"
});



db.color.hasOne(db.mascota, {as : "mascota"});
db.mascota.belongsTo(db.color, {
    foreignKey : "colorID",
    as : "color"
});



db.mascota.belongsToMany(db.vacuna, {
    through: 'mascota_vacuna', 
    foreignKey: 'mascotaId', 
    as: 'vacunas' 
  });
db.vacuna.belongsToMany(db.mascota, {
    through: 'mascota_vacuna', 
    foreignKey: 'vacunaId', 
    as: 'mascotas' 
  });

module.exports = db;