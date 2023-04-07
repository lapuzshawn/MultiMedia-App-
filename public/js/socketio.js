const socket = io();

// Send a message to the server
socket.emit('message', 'Hello from the client!');

// Handle incoming messages from the server
socket.on('greeting', (data) => {
	console.log(`Received greeting from server: ${data}`);
});
