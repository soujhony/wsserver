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
  socket.on('video', ({ seq, frame }) => {
    console.log(frame)
    socket.broadcast.emit('stream', { frame, seq })
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
