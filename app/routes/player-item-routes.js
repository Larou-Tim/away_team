var db = require("../models");

module.exports = function (app) {

  app.get("/api/playerItems/:playerid", function (req, res) {

    db.PlayerItem.findAll({
      include: [db.Item],
      where: {
        PlayerId: req.params.playerid

      }
    }).then(function (dbPlayerItem) {

      res.json(dbPlayerItem);
    });
  });

    app.get("/api/playerItems/", function (req, res) {

    db.PlayerItem.findAll({
      include: [db.Item],
     
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


}