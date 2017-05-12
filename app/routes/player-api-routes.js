var db = require("../models");

module.exports = function (app) {

  //insert for item testing

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


  //need to add pull for single player id

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


  // ------------------- PLAYER ITEMS

  app.get("/api/playerItems/:playerid", function (req, res) {

    db.PlayerItem.findAll({
      include: [db.Item],
      where: {
        PlayerId: req.params.playerid

      }
    }).then(function (dbPlayerItem) {
      // console.log(dbPlayerItem);
      res.json(dbPlayerItem);
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


  app.post("/api/playerItems", function (req, res) {
    db.PlayerItem.create(req.body).then(function (dbItems) {
      res.json(dbItems);
    });
  });


  app.put("/api/playerItems", function (req, res) {
 
    db.PlayerItem.update(
      req.body,
      {
        where: {
          PlayerId: req.body.PlayerId,
          spot: req.body.spot
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

  app.post("/api/playerHand", function (req, res) {
    // console.log("ReqBody", req.body)
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

};
