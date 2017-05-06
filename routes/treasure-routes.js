var db = require("../models");

module.exports = function(app) {
  app.get("/api/", function(req, res) {
    //Query to draw a treasure card
    db.Treasures.findAll({
      limit: 1,
      order: [Sequelize.fn('RAND')]
    }).then(function(dbDrawTreasure) {
      res.json(dbDrawTreasure);
    });
  });

};