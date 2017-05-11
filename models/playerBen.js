module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    race: {
      type: DataTypes.STRING, 
      allowNull: false
    },  
    class: {
      type: DataTypes.STRING, 
      allowNull: false
    }
  }   
  );
  return Player;
};