var db = require("../models");
var Sequelize = require('sequelize');
module.exports = function (app) {

    app.get("/api/hallwin/", function (req, res) {
        //Query to draw a treasure card
        db.Hallwin.findAll({
            limit: 5,
            order: Sequelize.literal('id DESC')
        }).then(function (dbWin) {
            res.json(dbWin);
        });
    });

    app.post("/api/hallwin", function (req, res) {
 
        db.Hallwin.create(req.body).then(function (dbWin) {
            res.json(dbWin);
        });
    });

};
