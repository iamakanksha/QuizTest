'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('drive_tests', {
      tid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cid: {
        type: Sequelize.INTEGER,
        references: {
          model:'colleges',
          key: 'cid',
        }
      },
      easy: {
        type: Sequelize.INTEGER
      },
      medium: {
        type: Sequelize.INTEGER
      },
      hard: {
        type: Sequelize.INTEGER
      },
      test_date: {
        type: Sequelize.DATE
      },
      is_active: {
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
    return queryInterface.dropTable('drive_tests');
  }
};