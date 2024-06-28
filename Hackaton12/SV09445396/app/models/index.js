const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize('comprasdb', 'root', 'P@$w0rd', {
    host: 'localhost',
    dialect: 'mysql', 
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.compras = require("./compras.model.js")(sequelize, Sequelize);

module.exports = db;


