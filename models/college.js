'use strict';
module.exports = (sequelize, DataTypes) => {
  const college = sequelize.define('college', {
    cid:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    college_name: DataTypes.STRING
  }, {});
  college.associate = function(models) {
    // associations can be defined here
    college.hasMany(models.user)
    college.hasMany(models.drive_test)
  };
  return college;
};