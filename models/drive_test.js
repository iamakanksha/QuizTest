'use strict';
module.exports = (sequelize, DataTypes) => {
  const drive_test = sequelize.define('drive_test', {
    tid:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    cid: {
      type: DataTypes.INTEGER,
      references: {
        model:'colleges',
        key: 'cid',
      }
    },
    easy: DataTypes.INTEGER,
    medium: DataTypes.INTEGER,
    hard: DataTypes.INTEGER,
    test_date: DataTypes.DATE
  }, {});
  drive_test.associate = function(models) {
    // associations can be defined here
    drive_test.belongsTo(models.college)
    drive_test.hasMany(models.drive_question)
    drive_test.hasMany(models.user)
  };
  return drive_test;
};