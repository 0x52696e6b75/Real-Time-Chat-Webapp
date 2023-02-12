var socket = io();

var form = document.getElementById('send-container');
var input = document.getElementById('messageInp');

const userName = prompt("Enter your name to join");
socket.emit('new-user-joined', userName);

// Append function messages sent/received
// const appendMsg = (message, possition) => {
//     const messageElement = document.createElement("div");
//     messageElement.innerHTML = message;
//     messageElement.classList.add('message'); 
//     messageElement.classList.add(possition);

// }


// New user joined broadcast
socket.on('user-joined', (userName) => {
    // alert(`${userName} joined the chat`);
    const para = document.createElement("div");
    para.innerHTML = `${userName} joined the chat`;
    para.classList.add('newuser-box');
    // para.classList.add('userjoined-center');
    document.getElementById('box').appendChild(para);
});

socket.on('user-name', userName => {
    // Displaying user name
    const username = document.createElement("h3");
    username.innerHTML = `${userName}`;
    username.classList.add('fw-formal');
    // username.classList.add('userjoined-center');
    document.getElementById('user-name').appendChild(username);
});

// User left broadcast
socket.on('user-left', (userName) => {
    // alert(`${userName} left the chat`);
    const para = document.createElement("div");
    para.innerHTML = `${userName} left the chat`;
    para.classList.add('newuser-box');
    // para.classList.add('userjoined-center');
    document.getElementById('box').appendChild(para);
});

// Listening for message sent event/form submit
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

// Displaying user own message to them on the right
socket.on('send', msg => {
    const para = document.createElement("div");
    para.innerHTML = `${msg}`;
    para.classList.add('message');
    para.classList.add('right');
    document.getElementById('box').appendChild(para);
})

// Displaying other users messges on the left
socket.on('receive', (data) => {
    const para = document.createElement("div");
    para.innerHTML = `<b> ${data.userName}:</b> <br> ${data.msg}`;
    para.classList.add('message');
    para.classList.add('left');
    document.getElementById('box').appendChild(para);
});

