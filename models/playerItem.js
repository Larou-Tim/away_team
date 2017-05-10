module.exports = function (sequelize, DataTypes) {
  var PlayerItem = sequelize.define("PlayerItem", {
    itemSpot: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }
    

  );
  return PlayerItem;
};
