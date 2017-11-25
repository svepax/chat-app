var socket = io();

socket.on('connect', function () {
    var params = $.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if(err) {
            alert(err);
            window.location.href = '/index.html';
        } else {
            console.log('No error');
        }
    });
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

    scrollToBottom();
});

jQuery('#messageForm').on('submit', function (e) {
    e.preventDefault();
  
    var messageTextbox = $('#msg');
  
    socket.emit('createMessage', {
      from: 'User',
      text: messageTextbox.val()
    }, function () {
      messageTextbox.val('')
    });
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

    scrollToBottom();
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

function scrollToBottom() {
    // selectors
    var messages = $('#response');
    var newMessage = messages.children('li:last-child');
    // heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}