const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var {generateMessage, generateLocationMessage} = require('./utils/message');
var {isRealString} = require('./utils/validation');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    
    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required');
        };

        socket.join(params.room);
        // socket.leave('The blabla Fans');

        // io.emit -> io.to('The blabla Fans').emit
        // socket.broadcast.emit -> socket.broadcast.to('The blabla Fans').emit
        // socket.emit -> 

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', params.name + ' joined'));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        //io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });

        socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })

    socket.on('disconnect', () => {
        console.log('Disconnected from user');
    });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
