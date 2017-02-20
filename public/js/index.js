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
  // console.log('newMessage', message);
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createMessage).format('h:mm a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from} ${formattedTime}: `);
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
  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function (){
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled','disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.')
  });
});
