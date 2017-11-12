var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createMessage', {
        to: 'joe',
        text: 'Hey. What\'s uuuuuup?'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (msg) {
    console.log("message", msg);
    $('#response').html(JSON.stringify(msg, '<br/>', 4));
});

socket.on('newMessage', function(message) {
    socket.emit('createMessage', message);
});

function sendMessage() {            
    console.log('sending message: ' + $('#msg').val());
    socket.emit('newMessage', { message: $('#msg').val() });
    $('#msg').val(null);
}