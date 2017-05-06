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
 
    }

        // {  
        //     classMethods: {
        //         associate: function (models) {
        //            Customer.hasMany(models.Burger, {
        //                 onDelete: "cascade"
        //             });
        //         }
        //     }
        // }
    );
    return Item;
};
