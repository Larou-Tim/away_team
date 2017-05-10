module.exports = function (sequelize, DataTypes) {
    var Player = sequelize.define("Player", {

        name: DataTypes.STRING,
        level: DataTypes.INTEGER,
        effectiveLevel: DataTypes.INTEGER
    },
        {
            classMethods: {
                associate: function (models) {
                    Player.belongsToMany(models.Item, {through: models.PlayerItem});
                },

                associate: function (models) {
                   Player.belongsToMany(models.Item, {through: models.PlayerHand});
                },
            }


        }
    );
    return Player;
};




