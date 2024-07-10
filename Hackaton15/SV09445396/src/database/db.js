var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    database: "courier",
    user: "root",
    password: "P@$w0rd"
});

con.connect(function (err) {
    if (err) throw err;
	
    var sql = "CREATE TABLE IF NOT EXISTS  message (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, message VARCHAR(2550) , user VARCHAR(250))";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    var sql = "CREATE TABLE IF NOT EXISTS  login (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, username VARCHAR(250) unique , password VARCHAR(250))";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    // Creacion de tabla de PAQUETES
    if (err) throw err;
    var sql = `CREATE TABLE IF NOT EXISTS paquetes 
        ( id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL,
        direccion VARCHAR(100) NOT NULL,
        telefono VARCHAR(9) NOT NULL,
        correo VARCHAR(30) NOT NULL,
        descripcion VARCHAR(255) NOT NULL,
        peso integer NOT NULL,
        largo integer NOT NULL,
        ancho integer NOT NULL,
        alto  integer NOT NULL,
        dir_entrega VARCHAR(100) NOT NULL,
        estado VARCHAR(20) NOT NULL DEFAULT 'Pendiente')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    // Creacion de tabla de ESTADOS
    const borraTablaEstado = "DROP TABLE IF EXISTS estados"     
    const createTablaEstado = "CREATE TABLE IF NOT EXISTS estados ( id INT AUTO_INCREMENT PRIMARY KEY, estado VARCHAR(50) NOT NULL )"
    const insertDataEstado = "INSERT INTO estados (estado) VALUES ('Pendiente'),('En preparacion'),('En transito'),('Entregado'),('Devuelto'),('Extraviado'),('Cancelado')";
    con.query(borraTablaEstado, function (err, result) {
        if (err) throw err;
    });
    con.query(createTablaEstado, function (err, result) {
        if (err) throw err;
    });
    con.query(insertDataEstado, function (err, result) {
        if (err) throw err;
    });

});

module.exports = con;
