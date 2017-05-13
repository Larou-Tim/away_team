var db = require("../models");
var Sequelize = require('sequelize');
module.exports = function (app) {


    app.get("/api/halldeath/", function (req, res) {
        //Query to draw a treasure card
        db.Halldeath.findAll({
            limit: 5,
            order: Sequelize.literal('id DESC')
        }).then(function (dbDeath) {
            res.json(dbDeath);
        });
    });

    app.post("/api/halldeath", function (req, res) {
 
        db.Halldeath.create(req.body).then(function (dbDeath) {
            res.json(dbDeath);
        });
    });

};
