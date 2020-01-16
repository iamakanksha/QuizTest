'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    uid:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    uname: DataTypes.STRING,
    phoneno: DataTypes.BIGINT,
    emailid: DataTypes.STRING,
    degree: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    cid: {
      type: DataTypes.INTEGER,
      references: {
        model:'colleges',
        key: 'cid',
      }
    },
    upassword: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    user.belongsTo(models.college)
    user.hasMany(models.user_test)
  };
  return user;
};