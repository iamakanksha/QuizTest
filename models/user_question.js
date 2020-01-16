'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_question = sequelize.define('user_question', {
    uid:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      //autoIncrement: true
      references: {
        model:'user_test',
        key: 'uid',
      }
    },
    tid:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      //autoIncrement: true
      references: {
        model:'drive_question',
        key: 'tid',
      }
    },
    qid:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      //autoIncrement: true
      references: {
        model:'drive_question',
        key: 'qid',
      }
    }, 
    answer_marked: DataTypes.STRING,
    is_correct: DataTypes.BOOLEAN
  }, {});
  user_question.associate = function(models) {
    // associations can be defined here
    user_question.belongsTo(models.user_test)
    user_question.belongsTo(models.drive_question)
  };
  return user_question;
};