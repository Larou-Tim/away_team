var db = require("./models");



db.sequelize.sync({ force: false }).then(function() {

});

// --------------- Will be in Database -------------------------

db.Item.create(
    {"name": "LazOr",
    "bonus":3}).then(function (dbItems) {});

db.Item.create(
    {"name": "Battleship",
    "bonus":10}).then(function (dbItems) {});

db.Item.create(
    {"name": "Crazy Driod",
    "bonus":5}).then(function (dbItems) {});

db.Item.create(
    {"name": "Lacky",
    "bonus":2}).then(function (dbItems) {});

db.Item.create(
    {"name": "Smuggler",
    "bonus":4}).then(function (dbItems) {});

db.Item.create(
    {"name": "bfg",
    "bonus":6}).then(function (dbItems) {});

db.Item.create(
    {"name": "Force Field",
    "bonus":4}).then(function (dbItems) {});