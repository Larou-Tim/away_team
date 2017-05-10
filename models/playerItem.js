module.exports = function (sequelize, DataTypes) {
  var PlayerItem = sequelize.define("PlayerItem", {
    itemSpot: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
        {
            classMethods: {

                associate: function (models) {
                    PlayerItem.belongsTo(models.Item );
                     PlayerItem.belongsTo(models.Player );
                }
            }


        }
    

  );
  return PlayerItem;
};
