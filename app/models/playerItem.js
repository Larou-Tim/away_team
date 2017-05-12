module.exports = function (sequelize, DataTypes) {
  var PlayerItem = sequelize.define("PlayerItem", {
    spot: DataTypes.STRING

  },
    {

      classMethods: {
        associate: function (models) {

          PlayerItem.belongsTo(models.Item, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return PlayerItem;
};
