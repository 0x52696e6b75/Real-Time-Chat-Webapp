var socket = io();

var form = document.getElementById('send-container');
var input = document.getElementById('messageInp');
var scrollbar = document.getElementById('box'); // Scroll bar 

const userName = prompt("Enter your name to join");
socket.emit('new-user-joined', userName);

// New user joined broadcast
socket.on('user-joined', (userName) => {
    // alert(`${userName} joined the chat`);
    const para = document.createElement("div");
    para.innerHTML = `${userName} joined the chat`;
    para.classList.add('newuser-box');
    document.getElementById('box').appendChild(para);
    scrollbar.scrollTop = scrollbar.scrollHeight; // Scroll bar always at bottom for the new user joined notification
});

// Listening for user-name event for displaying user name
socket.on('user-name', userName => {
    // Displaying user name
    const username = document.createElement("h3");
    username.innerHTML = `${userName}`;
    username.classList.add('fw-formal');
    document.getElementById('user-name').appendChild(username);
});

// User left broadcast
socket.on('user-left', (userName) => {
    // alert(`${userName} left the chat`);
    const para = document.createElement("div");
    para.innerHTML = `${userName} left the chat`;
    para.classList.add('newuser-box');
    document.getElementById('box').appendChild(para);
    scrollbar.scrollTop = scrollbar.scrollHeight; // Scroll bar always at bottom for the new user joined notification
});

// Listening for message sent event/form submit
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

// Displaying user's own message to them on the right side
socket.on('send', msg => {
    const para = document.createElement("div");
    para.innerHTML = `${msg}`;
    para.classList.add('message-box');
    para.classList.add('right');
    document.getElementById('box').appendChild(para);
    scrollbar.scrollTop = scrollbar.scrollHeight; // Scroll bar always on bottom when new message sent
})

// Displaying other users messges on the left side
socket.on('receive', (data) => {
    const para = document.createElement("div");
    para.innerHTML = `<b> ${data.userName}:</b> <br> ${data.msg}`;
    para.classList.add('message-box');
    para.classList.add('left');
    document.getElementById('box').appendChild(para);
    scrollbar.scrollTop = scrollbar.scrollHeight; // Scroll bar always on bottom when new message recieved
});