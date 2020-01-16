'use strict';
module.exports = (sequelize, DataTypes) => {
  const question_bank = sequelize.define('question_bank', {
    qid:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    }, 
    question: DataTypes.STRING,
    option1: DataTypes.STRING,
    option2: DataTypes.STRING,
    option3: DataTypes.STRING,
    option4: DataTypes.STRING,
    correct_option: DataTypes.STRING,
    level: DataTypes.STRING
  }, {});
  question_bank.associate = function(models) {
    // associations can be defined here
    question_bank.hasMany(models.drive_question)
  };
  return question_bank;
};