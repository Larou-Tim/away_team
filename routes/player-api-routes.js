var db = require("../models");

module.exports = function (app) {

  //insert for item testing

  app.get("/api/players", function (req, res) {

    db.Player.findAll({}).then(function (dbPlayer) {

      res.json(dbPlayer);
    });
  });

  //need to add pull for single player id

  app.post("/api/players", function (req, res) {
    console.log(req.body);
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



  app.get("/api/playerItems/:id", function (req, res) {

    db.Player.findOne({
      include: [db.PlayerItem],
      where: {
        id: req.params.id
      }
    }).then(function (dbPlayerItem) {
      // console.log(dbPlayerItem);
      res.json(dbPlayerItem);
    });
  });



  app.get("/api/playerItems/:id", function (req, res) {

    db.Player.findOne({
      include: [db.PlayerHand],
      where: {
        id: req.params.id
      }
    }).then(function (dbPlayerHand) {
      // console.log(dbPlayerItem);
      res.json(dbPlayerHand);
    });
  });



  app.post("/api/playerItems", function (req, res) {
    db.PlayerItem.create(req.body).then(function (dbItems) {
      res.json(dbItems);
    });
  });


  app.post("/api/playerHand", function (req, res) {
    console.log("ReqBody", req.body)
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


};
