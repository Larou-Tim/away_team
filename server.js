<<<<<<< HEAD


var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var port = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public"
app.use(express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes
var routes = require("./routes/html-routes.js");
require("./routes/player-api-routes.js")(app);
require("./routes/card-api-routes.js")(app);

app.use("/", routes);

var db = require("./models");
db.Player.belongsToMany(db.Item, { through: db.PlayerItem });
db.Item.belongsToMany(db.Player, { through: db.PlayerItem });

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });
});



//insert for item testing

var item = {name:"Lazor",bonus:3,spot:"Weapon"}
db.Item.create(item)
item = {name:"Battleship",bonus:10,spot:"Ship"}
db.Item.create(item)
item = {name:"Lacky",bonus:2,spot:"Aide"}
db.Item.create(item)
item = {name:"Crazy Driod",bonus:4,spot:"Aide"}
db.Item.create(item)
item = {name:"Smuggling Ship",bonus:3,spot:"Ship"}
db.Item.create(item)
item = {name:"bfg",bonus:6,spot:"Weapon"}
db.Item.create(item)
item = {name:"Force Field",bonus:3,spot:"Armor"}
db.Item.create(item)
item = {name:"Phase Shifter",bonus:3,spot:"Armor"}
db.Item.create(item)
=======
// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));

// Routes =============================================================

require("./routes/html-routes.js")(app);
require("./routes/player-routes.js")(app);
require("./routes/doors-routes.js")(app);
require("./routes/treasure-routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

>>>>>>> ben-branch
