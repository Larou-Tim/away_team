var db = require("../models");
var Sequelize = require('sequelize');

module.exports = function (app) {
  app.get("/api/treasure/:amount", function (req, res) {
    //Query to draw a treasure card
    db.Item.findAll({
      limit: parseInt(req.params.amount),
      order: [Sequelize.fn('RANDOM')]
    }).then(function (dbDrawTreasure) {
      res.json(dbDrawTreasure);
    });
  });

};