module.exports = function(sequelize, DataTypes) {
    var users = sequelize.define("users", {
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      password: DataTypes.STRING,
      kills:DataTypes.INTEGER,
      level_one:DataTypes.INTEGER,
      level_two:DataTypes.INTEGER,
      level_three:DataTypes.INTEGER,
      total_score:DataTypes.INTEGER
    });
    return users;
  };