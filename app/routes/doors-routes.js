var db = require("../models");

module.exports = function(app) {
  app.get("/api/", function(req, res) {
    //Query to populate players hand when the game starts
    db.Doors.findAll({
      limit: 4,
      order: [Sequelize.fn('RAND')]
    }).then(function(dbHand) {
      res.json(dbHand);
    });
  });

};