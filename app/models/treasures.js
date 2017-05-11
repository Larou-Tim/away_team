module.exports = function(sequelize, DataTypes) {
  var Treasures = sequelize.define("Treasures", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    effect: {
      type: DataTypes.INTEGER
    },  
    description: {
      type: DataTypes.TEXT
    }
  }   
  );
  return Treasures;
};