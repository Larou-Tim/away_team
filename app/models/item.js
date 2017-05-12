module.exports = function (sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        bonus: {
            type: DataTypes.INTEGER,
        },
        spot: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT
        }, 
        image: { 
      type: DataTypes.STRING
    }

    },
        {
            classMethods: {


                associate: function (models) {
                    Item.belongsToMany(models.Player, { through: models.PlayerHand });
                    Item.belongsToMany(models.Player, { through: models.PlayerItem });
                }

            }
        }
    );
    return Item;
};


// db.Player.belongsToMany(db.Item,{through: db.PlayerHand})
// db.Item.belongsToMany(db.Player,{through: db.PlayerHand})