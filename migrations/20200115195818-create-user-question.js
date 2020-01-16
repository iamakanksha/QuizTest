'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_questions', {
      
      uid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        //autoIncrement: true,
        primaryKey: true,
        references: {
          model:'user_tests',
          key: 'uid',
        }
      },
      tid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        //autoIncrement: true,
        primaryKey: true,
        references: {
          model:'drive_questions',
          key: 'tid',
        }
      },
      qid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        //autoIncrement: true,
        primaryKey: true,
        references: {
          model:'drive_questions',
          key: 'qid',
        }
      },
      answer_marked: {
        type: Sequelize.STRING
      },
      is_correct: {
        type: Sequelize.BOOLEAN
      },
     
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_questions');
  }
};