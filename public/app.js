const socket = io('http://localhost:3000');

socket.on('broadcastingMessage', (message) => {
    displayMessage(message);
});

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    if (message.trim() !== '') {
        socket.emit('broadcastToRoom', 'user_123', message);
        messageInput.value = '';
    }
}

function displayMessage(message) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
