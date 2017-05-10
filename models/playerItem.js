module.exports = function (sequelize, DataTypes) {
  var PlayerItem = sequelize.define("PlayerItem", {
      spot: DataTypes.STRING

  });
  return PlayerItem;
};
