var db = require("../models");

module.exports = function (app) {

  app.post("/api/playerHand", function (req, res) {
    db.PlayerHand.create(req.body).then(function (dbHand) {
      res.json(dbHand);
    });
  });

  app.get("/api/playerHand/:id", function (req, res) {

    db.PlayerHand.findAll({
      where: {
        PlayerId: req.params.id
      }
    }).then(function (dbPlayerItem) {
      // console.log(dbPlayerItem);
      res.json(dbPlayerItem);
    });
  });

    app.get("/api/playerHand/", function (req, res) {

    db.PlayerHand.findAll({
     
    }).then(function (dbPlayerItem) {
      // console.log(dbPlayerItem);
      res.json(dbPlayerItem);
    });
  });

  app.delete("/api/playerHand/:itemId/:playerId", function (req, res) {
    db.PlayerHand.destroy({
      where: {
        ItemId: req.params.itemId,
        PlayerId: req.params.playerId
      }
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });


}