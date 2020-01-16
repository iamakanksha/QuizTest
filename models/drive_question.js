'use strict';
module.exports = (sequelize, DataTypes) => {
  const drive_question = sequelize.define('drive_question', {
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
    qid:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      //autoIncrement: true,
      references: {
        model:'question_bank',
        key: 'qid',
      }
    },
  }, {});
  drive_question.associate = function(models) {
    // associations can be defined here
    drive_question.belongsTo(models.drive_test)
    drive_question.belongsTo(models.question_bank)
    drive_question.hasMany(model.user_question)

  };
  return drive_question;
};