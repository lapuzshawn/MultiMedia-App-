const socket = io();

// Add event listeners for connection and errors
socket.on('connect', () => {
	console.log('Connected to server');
	socket.emit('message', 'Hello from the client!');
});

socket.on('receive-message', (message) => {
	displayMessage(message);
});

const messageInput = document.querySelector('#chat-input');
const sendButton = document.querySelector('#send-message');

const display = document.querySelector('.messages');

document.querySelector('.input').addEventListener('submit', (e) => {
	e.preventDefault();
	const message = messageInput.value;
	console.log(message);

	if (message === '') return;
	displayMessage(message);
	socket.emit('chat message', message);

	messageInput.value = '';
});

//display message
function displayMessage(message) {
	const div = document.createElement('div');
	div.textContent = message;
	display.append(div);
}
