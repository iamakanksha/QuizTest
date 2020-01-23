'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('question_banks', {
      qid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      question: {
        type: Sequelize.STRING
      },
      option1: {
        type: Sequelize.STRING
      },
      option2: {
        type: Sequelize.STRING
      },
      option3: {
        type: Sequelize.STRING
      },
      option4: {
        type: Sequelize.STRING
      },
      correct_option: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('question_banks');
  }
};