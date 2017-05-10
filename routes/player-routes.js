var db = require("../models");

module.exports = function(app) {
  app.post("/api/new", function(req, res) {
    //Query to create a player
    db.player.create({
      name: req.body.name,
      level: 1
    }).then(function(dbPlayer) {
      res.json(dbPlayer);
    });
  });

};