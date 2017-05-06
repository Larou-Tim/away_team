var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));

//routing
require("./routes/doors-routes")(app);
require("./routes/players-routes")(app);
require("./routes/treasure-routes")(app);
require("./routes/html-routes")(app);

app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
});