module.exports = function (sequelize, DataTypes) {
    var Halldeath = sequelize.define("Halldeath", {

        name: DataTypes.STRING,
        level: DataTypes.INTEGER,
        effectiveLevel: DataTypes.INTEGER,
        lastEnemy: DataTypes.STRING,
        turn: DataTypes.INTEGER
    }
    );
    return Halldeath;
};




