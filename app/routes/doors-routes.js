var db = require("../models");
var Sequelize = require('sequelize');

module.exports = function (app) {
  app.get("/api/door", function (req, res) {
    //Query to populate players hand when the game starts
    db.Door.findAll({
      limit: 1,
      order: [Sequelize.fn('RANDOM')]
    }).then(function (dbHand) {
      res.json(dbHand);
    });
  });

  app.get("/api/doors/:id", function (req, res) {

    db.Door.findAll({
      where: {
        id: req.params.id

      }
    }).then(function (dbDoor) {

      res.json(dbDoor);
    });
  });

};