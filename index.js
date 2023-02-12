const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

// Initializing new instance of socket.io
const { Server } = require("socket.io");
const io = new Server(server);

const path = require('path');
const port = 3000;
const userNames = {};

app.use(express.static('public'));

app.get('/', (req, res) => {
    // res.send('<h1>Chatter App</h1>');
    res.sendFile(path.join(__dirname, '/index.html'));
});

io.on('connection', (socket) => {
    // console.log('a user connected');

    // Getting name for newly joined user
    socket.on('new-user-joined', (userName) => {
        console.log(`${userName} joined the chat`);
        userNames[socket.id] = userName;
        socket.userName = userName;
        socket.broadcast.emit('user-joined', userNames[socket.id]);
        socket.emit('user-name', userName);
    });
    socket.on('disconnect', () => { // Getting name for disconnected user
        console.log(`${socket.userName} left the chat`);
        socket.broadcast.emit('user-left', userNames[socket.id]);
        delete userNames[socket.id];
    });
    
    // Listening for message sent by user
    socket.on('chat message', (msg) => {
        console.log('message from ' + socket.userName +": " + msg);
        socket.emit('send', msg);
        socket.broadcast.emit('receive', {msg: msg, userName: userNames[socket.id]});
    });
});

server.listen(port, () => {
    console.log(`Listening on *:${port}`);
});