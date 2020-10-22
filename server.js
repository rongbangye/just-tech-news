const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// turn on routes
app.use(routes);

// turn on connection to db and server
// By forcing the sync method to true, we will make the tables re-create if there are any association changes.
// This definition performs similarly to DROP TABLE IF EXISTS
// Dropping all the tables every time the application restarts is no longer necessary and
// in fact will constantly drop all the entries and seed data we enter, which can get very annoying.
//change the database connection in the server.js file back to {force: false}, then save our changes and
// restart the Express.js server again so that this change is reflected.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
