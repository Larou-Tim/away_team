module.exports = function(sequelize, DataTypes) {
  var Doors = sequelize.define("Doors", {
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
    category: {
      type: DataTypes.STRING  
    }, 
    level: {
      type: DataTypes.INTEGER
    }, 
    treasure: {
      type: DataTypes.INTEGER
    }, 
    description: {
      type: DataTypes.TEXT
    }
  }   
  );
  return Doors;
};

