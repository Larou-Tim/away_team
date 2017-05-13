
var db = require("../models");

module.exports = function (app) {

    app.get("/api/items/:id", function (req, res) {
        db.Item.findOne({ where: { id: req.params.id } }).then(function (dbItem) {
            // console.log(dbItem);
            res.json(dbItem);
        });
    });
     app.get("/api/items/", function (req, res) {
        db.Item.findAll({  }).then(function (dbItem) {
            // console.log(dbItem);
            res.json(dbItem);
        });
    });

};


