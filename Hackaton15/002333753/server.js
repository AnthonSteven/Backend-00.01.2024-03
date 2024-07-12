

const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport'); 
const session = require('express-session'); 
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});


require('./config/passport')(passport);


io.on('connection', (socket) => {
  console.log('A user connected');


  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


app.use(express.static('public'));


app.use(bodyParser.json());


app.use(session({
  secret: 'secret', 
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());


const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const packagesRouter = require('./routes/packages');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/packages', packagesRouter);
app.set('view engine', 'ejs');
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
