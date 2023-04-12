// Import required Node packages
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars-hotreload');
const http = require('http');
const { Server } = require('socket.io');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

exphbs.hotreload();

// Initialize Express and set up port
const app = express();
const PORT = process.env.PORT || 3001;
// Create a server instance
const server = http.createServer(app);

// Create a Socket.IO instance
const io = new Server(server);

// Create a Handlebars instance
const hbs = exphbs.create({
	hotreload: true,
});

// Set up session configuration
const sess = {
	secret: 'Super secret secret',
	cookie: {
		maxAge: 3600000,
		httpOnly: true,
		secure: false,
		sameSite: 'strict',
	},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

// Set up session middleware
app.use(session(sess));

// Set up Handlebars as the view engine
app.set('view engine', 'handlebars');
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, '/views'));

// Set up middleware for parsing request bodies and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use(routes);

// Set up Socket.IO events
io.on('connect', (socket) => {
	// Handle joining a room
	socket.on('join-room', (data) => {
		const roomName = data.roomName;
		const username = data.username;

		socket.join(roomName);
		console.log(`${username} has joined`, roomName);

		socket.emit(
			'message',
			`Welcome to the chat room ${roomName}`,
			'',
			'Chatbot',
		);

		socket
			.to(roomName)
			.emit('message', `${username} has joined the chat`, '', '');

		// Store the roomName in the socket's data object
		socket.data.roomName = roomName;
		socket.data.username = username;
		console.log(`A user has connected. ${socket.id}`);
	});

	// Handle new messages
	socket.on('new-message', (message, time, username, roomName) => {
		socket.broadcast.to(roomName).emit('message', message, time, username);
	});

	// Handle leaving a room
	socket.on('disconnect', () => {
		const username = socket.data.username;
		const roomName = socket.data.roomName;
		if (roomName) {
			socket
				.to(roomName)
				.emit('message', `${username} has left the chat`, '', '');
		}
	});
});

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
	server.listen(PORT, () => {
		console.log(`App listening on port ${PORT}!`);
	});
});
