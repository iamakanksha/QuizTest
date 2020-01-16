'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('drive_questions', {
      tid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        //autoIncrement: true,
        primaryKey: true,
        references: {
          model:'drive_tests',
          key: 'tid',
        }
      },
      qid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        //autoIncrement: true,
        primaryKey: true,
        references: {
          model:'question_banks',
          key: 'qid',
        }
      },
      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('drive_questions');
  }
};