const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.send({ msg: 'Its Alive!!!' });
});

io.of('streaming').on('connection', (socket) => {
  socket.on('request', (data) => {
    console.log(data)
    socket.broadcast.emit('register', data)
  })
  socket.on('video', ({ seq, sockets, frame }) => {
    // console.log(seq, sockets)
    for (const socketId of sockets) {
      socket.to(socketId).emit('video', frame)
    }
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('unregister', { socketId: socket.id })
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
