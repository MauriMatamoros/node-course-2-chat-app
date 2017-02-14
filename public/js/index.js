var socket = io();

socket.on('connect', function (){
  console.log('Connected to server');
  // socket.emit('createEmail', {//emit
  //   to: 'carlos@example.com',
  //   text: 'Hello World! 2',
  // });
  socket.emit('createMessage', {
    from: 'Mauri',
    text: 'New message for you'
  })
});

socket.on('disconnect', function (){
  console.log('Disconnected from server');
});

// socket.on('newEmail', function(email){//listen
//   console.log('New email');
//   console.log(email);
// });
socket.on('newMessage', function (message){
  console.log('newMessage', message);
});
