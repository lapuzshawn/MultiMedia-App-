// Import required Node packages
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize Express and set up port
const app = express();
const PORT = process.env.PORT || 3001;

// Create a Handlebars instance
const hbs = exphbs();

// Set up session configuration
const sess = {
	secret: 'Super secret scret',
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

// Set up session middleware
app.use(session(sess));

// Set up Handlebars as the view engine
app.engine('handlebars', hbs);
app.set('view engine', 'handlebars');

// Set up middleware for parsing request bodies and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use(routes);

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log('Now listening '));
});
