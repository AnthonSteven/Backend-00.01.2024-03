// config/database.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// URL de conexión a la base de datos, se puede definir en el archivo .env
const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/online_courses';

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    // Intentar conectarse a la base de datos con los parámetros especificados
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Conectado a la base de datos');
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err.message);
    // Salir del proceso con fallo
    process.exit(1);
  }
};

module.exports = connectDB;