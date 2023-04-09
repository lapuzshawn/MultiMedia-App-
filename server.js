// Import required Node packages
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars-hotreload");
const routes = require("./controllers");
exphbs.hotreload();

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Initialize Express and set up port
const app = express();
const PORT = process.env.PORT || 3001;

// Create a Handlebars instance
const hbs = exphbs.create({
  hotreload: true,
});

// Set up session configuration
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
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
app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);
app.set('views', path.join(__dirname, '/views'));

// Set up middleware for parsing request bodies and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set up routes
app.use(routes);

// Sync the database and start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});
