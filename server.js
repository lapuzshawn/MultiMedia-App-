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
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up middleware for parsing request bodies and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use(routes);

// Set up Socket.IO events
io.on('connection', (socket) => {
	console.log('A user has connected.');
	socket.on('chat message', (message) => {
		socket.broadcast.emit('receive-message', message);
		console.log('message: ' + message);
	});
});

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
	server.listen(PORT, () => {
		console.log(`App listening on port ${PORT}!`);
	});
});
