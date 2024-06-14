const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('Veterinario', 'root', 'sasuke2558', {
  host: 'localhost',
  dialect: 'mysql', 
  port:'3306'
});

module.exports = sequelize;