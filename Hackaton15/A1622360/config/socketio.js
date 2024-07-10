const socketIo = require('socket.io');

function initializeSocket(server) {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Implementa lógica de Socket.io según sea necesario

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
}

module.exports = initializeSocket;
