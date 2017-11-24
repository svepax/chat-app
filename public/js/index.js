var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log(message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#response').append(li);
});

socket.on('newLocationMessage', function(message) {
    console.log('creating Link');
    var li = $('<li></li>');
    li.text(`${message.from}: `);
    var a = $('<a target="_blank">My current location</a>');
    a.attr('href', `${message.url}`);    
    li.append(a);
    
    $('#response').append(li);
})

var locationButton = jQuery('#sendLocation');
locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    $('#sendLocation').attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        $('#sendLocation').removeAttr('disabled');
        $('#sendLocation').text('Send location');
        
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        $('#sendLocation').removeAttr('disabled');
        $('#sendLocation').text('Send location');
        alert('Unable to fetch location');
    });
});