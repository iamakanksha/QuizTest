'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_test = sequelize.define('user_test', {
    uid:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      //autoIncrement: true,
      references: {
        model:'user',
        key: 'uid',
      }
    },
    tid:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      //autoIncrement: true,
      references: {
        model:'drive_test',
        key: 'tid',
      }
    },
    score: DataTypes.INTEGER,
    emailid:DataTypes.STRING,
    
  
    uname:DataTypes.STRING,
    

  }, {});
  user_test.associate = function(models) {
    // associations can be defined here
    user_test.belongsTo(models.user)
    user_test.belongsTo(models.drive_test)
    user_test.hasMany(models.user_question)
  };
  return user_test;
};