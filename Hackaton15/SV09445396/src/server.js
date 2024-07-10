var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var session = require('express-session');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');
import { SECRET, PORT } from "./config";

var username;
let email = "";
let connections = [];
var con = require('./database/db');

app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}))

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: SECRET }));

app.get('/', function (req, res) {
    authenticate(req, res);
});

function authenticate(req, res) {
    //console.log("authenticate called");
    if (!req.session.user) {
        res.sendFile(__dirname + '/public/login.html');
    }
    else {
        //console.log(req.session.user);
        username = req.session.user;
        res.sendFile(__dirname + '/public/paquetes.html');
    }
}

app.get('/login', function (req, res) {
    authenticate(req, res);
});

app.post('/login', function (req, res) {
    login(req, res);
});

app.get('/logout', function (req, res) {
    delete req.session.user;

    req.session = null;
    //req.logout();
    res.redirect('/login');
});

app.get('/google',
    passport.authenticate('google', {
        scope:
            ['email']
    }
));

app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/failed', }),
    function (req, res) {
        console.log(req.user.email);
        email = req.user.email;
        res.redirect('/success')
    }
);


app.get("/success", (req, res) => {
    var sql = "REPLACE INTO login (username , password) VALUES ('" + email + "' , 'oauth')";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    req.session.user = email;
    username = email;
    res.redirect("/chat_start");
})

app.get('/chat_start', function (req, res) {
    authenticate(req, res);
});


function login(req, res) {
    var post = req.body;
    username = post.user;
    var password = post.password;
    //console.log(username);
    var sql = "SELECT * FROM login WHERE username='" + username + "'";

    con.query(sql, function (err, result, fields) {
        if (result.length === 1) {
            var jsonString = JSON.stringify(result);
            var jsonData = JSON.parse(jsonString);
            if (jsonData[0].password === password) {
                //console.log("User Identified");
                req.session.user = post.user;
                username = post.user;
                res.redirect("/chat_start");
            } else {
                //console.log("user not Identified");
                res.redirect("/login");
            }
        } else {
            res.redirect("/login");
        }
    });
}


// ===========================================================================
// PAQUETES
// ===========================================================================

// Emitir cambios a los clientes conectados
const emitirPaquetes = () => {
    con.query('SELECT * FROM paquetes', (err, results) => {
      if (err) {
        console.error('Error al obtener paquetes:', err);
        return;
      }
      io.emit('paquetes', results);
    });
};
  
  
app.get('/api/estados', (req, res) => {
    const query = 'SELECT id, estado FROM estados';
    con.query(query, (err, results) => {
        if (err) {
            // console.error('Error ejecutando la consulta:', err.stack);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json(results);
    });
});
  
  
// Ruta para obtener todos los paquetes
app.get('/paquetes', (req, res) => {
    con.query('SELECT * FROM paquetes', (err, results) => {
      if (err) {
        // console.error('Error al obtener paquetes:', err);
        res.status(500).send('Error al obtener paquetes');
        return;
      }
      res.json(results);
    });
});
  
  
// Ruta para añadir un nuevo paquete
app.post('/paquetes', (req, res) => {
    const { nombre, direccion, telefono, correo, descripcion, peso, largo, ancho, alto, dir_entrega } = req.body;
    const query = 'INSERT INTO paquetes (nombre, direccion, telefono, correo, descripcion, peso, largo, ancho, alto, dir_entrega) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    con.query(query, [nombre, direccion, telefono, correo, descripcion, peso, largo, ancho, alto, dir_entrega], (err, results) => {
      if (err) {
        // console.error('Error al añadir paquete:', err);
        res.status(500).send('Error al añadir paquete');
        return;
      }
      emitirPaquetes();
      res.status(201).redirect('/');
    });
});
  
  
  
// Ruta para actualizar el estado de un paquete
app.post('/paquetes/actualizar', (req, res) => {
    const { id, estado } = req.body;
  
    const csql = 'SELECT estado FROM paquetes WHERE id = ?';
    con.query(csql, [id], (err, results) => {
      if (err) {
        // console.error('Error al ejecutar la consulta:', err);
        socket.emit('error', 'Error al obtener el valor del campo');
        return;
      }
  
      if (results.length === 0) {
        socket.emit('error', 'Paquete no encontrado');
        return;
      }
  
      const valorActual = results[0].estado;
      console.log('Valor actual:', valorActual);
  
      if (valorActual==='Entregado' || valorActual==='Devuelto' || valorActual==='Extraviado' || valorActual==='Cancelado') {
        // socket.emit('success', `Paquete fue: ${valorActual}`);
        // socket.emit('success', 'Campo actualizado correctamente');
        return;
      }
  
      const query = 'UPDATE paquetes SET estado = ? WHERE id = ?';
      con.query(query, [estado, id], (err, results) => {
        if (err) {
          // console.error('Error al actualizar paquete:', err);
          res.status(500).send('Error al actualizar paquete');
          return;
        }
        emitirPaquetes();
        res.redirect('/');
      });
  
    });
    
});
  
// Ruta para eliminar un paquete
app.post('/paquetes/eliminar', (req, res) => {
    const { id } = req.body;
    const query = 'DELETE FROM paquetes WHERE id = ?';
    con.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error al eliminar paquete:', err);
        res.status(500).send('Error al eliminar paquete');
        return;
      }
      emitirPaquetes();
      res.redirect('/');
    });
});

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');
    
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  
    // Actualizacion y verificacion de estados del paquete
    socket.on('updateField', (id, estado) => {
  
      const csql = 'SELECT estado FROM paquetes WHERE id = ?';
      con.query(csql, [id], (err, results) => {
        if (err) {
          socket.emit('error', 'Error al obtener el valor del campo');
          return;
        }
    
        if (results.length === 0) {
          socket.emit('success', 'Paquete no encontrado');
          return;
        }
   
        const valorActual = results[0].estado;
    
        // Aquí puedes añadir cualquier lógica de validación necesaria
        if (valorActual==='Entregado' || valorActual==='Devuelto' || valorActual==='Extraviado' || valorActual==='Cancelado') {
          socket.emit('success', `Paquete fue ${valorActual}`);
          return;
        }
    
        const query = 'UPDATE paquetes SET estado = ? WHERE id = ?';
        con.query(query, [estado, id], (err, results) => {
          if (err) {
            // console.error('Error al actualizar paquete:', err);
            res.status(500).send('Error al actualizar paquete');
            return;
          }
  
          // console.log('Campo actualizado');
          // socket.emit('success', 'Campo actualizado correctamente');
        });
    
      });
  
    })
  
    emitirPaquetes();
  
  });



server.listen(PORT, function () {
    console.log(`listening on *:${PORT}`);
});
