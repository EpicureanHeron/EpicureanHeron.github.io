module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
      burger_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      devoured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
        len: [1]
        }
      }
    });
  
    Burger.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Burger.belongsTo(models.Customer, {
        foreignKey: {
          //changed this from false to true to be able to stage data, need to think if this has to be this way
          allowNull: true
        }
      });
    };
  
    return Burger;
  };
  