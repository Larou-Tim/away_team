var db = require("../models");

module.exports = function (app) {


  app.get("/api/players", function (req, res) {

    db.Player.findAll({}).then(function (dbPlayer) {

      res.json(dbPlayer);
    });
  });

  app.get("/api/players/:id", function (req, res) {


    db.Player.findAll({
      where: {
        id: req.params.id

      }
    }).then(function (dbPlayerItem) {
      // console.log(dbPlayerItem);
      res.json(dbPlayerItem);
    });
  });

  app.put("/api/playerLevelUp/", function (req, res) {

    db.Player.update(
      req.body,
      {
        where: {
          id: req.body.id,
        }
      }).then(function (dbPlayerItem) {
        res.json(dbPlayerItem);
      });
  });

  app.post("/api/players", function (req, res) {
    // console.log(req.body);
    db.Player.create(req.body).then(function (dbPlayer) {
      res.json(dbPlayer);
    });
  });

  app.delete("/api/players/:id", function (req, res) {
    db.Player.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbPlayer) {
      res.json(dbPlayer);
    });
  });

  // updating the effective level after playing items

  app.put("/api/playerELevel/", function (req, res) {

    db.Player.update(
      req.body,
      {
        where: {
          id: req.body.id,
        }
      }).then(function (dbPlayerItem) {
        res.json(dbPlayerItem);
      });
  });

  app.delete("/api/playerItems/:itemId/:playerId", function (req, res) {
  
    db.PlayerItem.destroy({
      where: {
        ItemId: req.params.itemId,
        PlayerId: req.params.playerId
      }
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });
};
