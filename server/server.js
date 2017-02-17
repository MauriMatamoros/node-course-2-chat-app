const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.emit('newMessage', generateMessage('Admin','Welcome to the Chat App'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
  // socket.emit('newEmail', {//emit
  //   from: 'mauricio@example.com',
  //   text: 'Hello World',
  //   createdAt: 123
  // });

  // socket.emit('newMessage', {
  //   from: 'Server',
  //   text: 'Hello User',
  //   createdAt: 123123
  // });

  socket.on('createMessage', (message) => {//socket emits to one connection, io emits to all
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  // socket.on('createEmail', (newEmail) => {//listen
  //   console.log('createEmail', newEmail);
  // });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
