var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    var template = $('#message-template').html();
    var formattedTime = moment(message.createdAt).format('HH:mm');
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#response').append(html);
});

socket.on('newLocationMessage', function(message) {
    var template = $('#location-template').html();
    var formattedTime = moment(message.createdAt).format('HH:mm');
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    $('#response').append(html);
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