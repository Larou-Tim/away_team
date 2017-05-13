module.exports = function (sequelize, DataTypes) {
  var PlayerHand = sequelize.define("PlayerHand", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },



  },
    {
      classMethods: {

        associate: function (models) {
          PlayerHand.belongsTo(models.Item, {unique: false });
          PlayerHand.belongsTo(models.Player, {unique: false});
        }
      }


    }
  );

  return PlayerHand;
};
