var socket = io();

socket.on('connect', function (){
  console.log('Connected to server');
  // socket.emit('createEmail', {//emit
  //   to: 'carlos@example.com',
  //   text: 'Hello World! 2',
  // });
//   socket.emit('createMessage', {
//     from: 'Mauri',
//     text: 'New message for you'
//   })
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
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'Mauri',
//   text: 'Hello there!'
// }, function (data) {
//   console.log('Got it', data);
// });

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function (){

  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.')
  });
});
