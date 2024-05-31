var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pacha2024",
  database: "mydb"
});


// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("1 record inserted");
//     });
//   });


// con.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT * FROM customers", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//     });
//   });

// con.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT * FROM customers WHERE address = 'Highway 37'", function (err, result) {
//       if (err) throw err;
//       console.log(result);
//     });
//   });

// con.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT * FROM customers ORDER BY name", function (err, result) {
//       if (err) throw err;
//       console.log(result);
//     });
//   });

// con.connect(function(err) {
//     if (err) throw err;
//     var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Number of records deleted: " + result.affectedRows);
//     });
//   });

con.connect(function(err) {
    if (err) throw err;
    var sql = "DROP TABLE customers";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table deleted");
    });
});