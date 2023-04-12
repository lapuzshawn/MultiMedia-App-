const socket = io();

// Add event listeners for connection and errors
socket.on('connect', () => {
	console.log('Connected to server');
	socket.emit('message', 'Hello from the client!');
});

// Add an event listener to the send button
const messageInput = document.querySelector('#chat-input');
const sendButton = document.querySelector('#send-button');
const display = document.querySelector('.chat-area');

const now = new Date();
const time = now.toLocaleTimeString([], {
	hour: '2-digit',
	minute: '2-digit',
	hour12: true,
});

//Getting the room name
const roomName = document.querySelector('.room-Name').textContent;
const leaveRoom = document.querySelector('#leave-chat');

//emitting that a user has joined the room
const joinRoom = async () => {
	const username = await getCurrentUser();
	socket.emit('join-room', { roomName: roomName, username: username });
	console.log(`${username} has joined the room`);
};
joinRoom();

window.addEventListener('beforeunload', async (event) => {
	socket.emit('disconnect', roomName, username);
});

socket.on('disconnect', (username) => {
	const message = `${username} has left the room`;
	displaySentMessage(message);
});

//On receiving 'join-rooom' emit
socket.on('join-room', (username) => {
	console.log('user has joined the room');
	const message = `${username} has joined the room`;
	displaySentMessage(message, time);
});
// Define the function that sends a message
const sendMessage = async (event) => {
	if (event.keyCode === 13 || event.type === 'click') {
		event.preventDefault();

		// Get the message text from the input
		const message = messageInput.value.trim();

		//Fetch the user's username
		const username = await getCurrentUser();

		// Emit a 'new message' event to the server
		if (message === '') return;

		// Emit the message and timestamp to the server
		socket.emit('new-message', message, time, username, roomName);
		displayMessage(message, time, username);

		// Clear the input
		messageInput.value = '';

		// Set focus back on the input
		messageInput.focus();
	}
};

//EventListener for the send button
sendButton.addEventListener('click', sendMessage);

//On receiving 'message' emit
socket.on('message', (message, time, username) => {
	console.log('message: ' + message);
	displaySentMessage(message, time, username);
	display.scrollTop = display.scrollHeight;
});

//display message sent from a user
function displaySentMessage(message, time, username) {
	const messageElement = document.createElement('div');
	messageElement.classList.add(
		'bg-gray-100',
		'rounded-lg',
		'px-4',
		'py-2',
		'my-2',
		'mb-6',
	);

	// Create a <span> element to display the user's name and timestamp
	const userElement = document.createElement('span');
	userElement.classList.add('font-bold', 'mr-2', 'text-xs', 'text-gray-500');
	userElement.textContent = `${username} ${time}`;

	// Add the user's name, timestamp, and message text to the <div> element
	messageElement.append(userElement);
	messageElement.append(document.createElement('br'));
	messageElement.append(document.createTextNode(message));

	// Add the message <div> element to the chat area
	display.append(messageElement);
	display.scrollTop = display.scrollHeight;
}

//Display message sent by you
function displayMessage(message, time, username) {
	const messageElement = document.createElement('div');
	messageElement.classList.add(
		'bg-blue-100',
		'rounded-lg',
		'px-4',
		'py-2',
		'my-2',
		'mb-6',
	);

	// Create a <span> element to display the user's name and timestamp
	const userElement = document.createElement('span');
	userElement.classList.add('font-bold', 'mr-2', 'text-xs', 'text-gray-500');
	userElement.textContent = `${username} ${time}`;

	// Add the user's name, timestamp, and message text to the <div> element
	messageElement.append(userElement);
	messageElement.append(document.createElement('br'));
	messageElement.append(document.createTextNode(message));

	// Add the message <div> element to the chat area
	display.append(messageElement);
	display.scrollTop = display.scrollHeight;
}

//Fetch request to get the user's username
async function getCurrentUser() {
	const response = await fetch('/api/user/current/user');
	const data = await response.json();
	const username = data;

	return username;
}
