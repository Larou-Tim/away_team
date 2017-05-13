module.exports = function (sequelize, DataTypes) {
    var Hallwin = sequelize.define("Hallwin", {

        name: DataTypes.STRING,
        level: DataTypes.INTEGER,
        effectiveLevel: DataTypes.INTEGER,
        lastEnemy: DataTypes.STRING,
        turn: DataTypes.INTEGER
    }
    );
    return Hallwin;
};




