const express = require('express');
const http = require('http');
const path = require('path');
const app = require('./config/express');
const sequelize = require('./config/database');
const initializeSocket = require('./config/socketio');

const packageRoutes = require('./routes/packageRoutes');
const messageRoutes = require('./routes/messageRoutes');
const locationRoutes = require('./routes/locationRoutes');
const authRoutes = require('./routes/authRoutes');

require('./models/Package');
require('./models/Message');
require('./models/Location');
require('./models/User');

app.use('/packages', packageRoutes);
app.use('/messages', messageRoutes);
app.use('/locations', locationRoutes);
app.use('/auth', authRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const server = http.createServer(app);
const io = initializeSocket(server);

io.on('connection', (socket) => {
  console.log('A user connected via Socket.io');


  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

sequelize.sync({ force: false }).then(() => {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
