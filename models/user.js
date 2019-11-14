module.exports = function(sequelize, DataTypes) {
    var users = sequelize.define("users", {
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      password: DataTypes.STRING,
      total_score:DataTypes.INTEGER
    });
    return users;
  };