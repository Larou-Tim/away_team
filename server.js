// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./app/models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./app/public"));

// Routes =============================================================

// require("./app/routes/html-routes.js")(app);
require("./app/routes/player-api-routes.js")(app);
require("./app/routes/card-api-routes.js")(app);
// require("./app/routes/doors-routes.js")(app);
// require("./app/routes/treasure-routes.js")(app);

// db.Player.belongsToMany(db.Item, { through: db.PlayerItem });
// db.Item.belongsToMany(db.Player, { through: db.PlayerItem });

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
