'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    profile_image: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};