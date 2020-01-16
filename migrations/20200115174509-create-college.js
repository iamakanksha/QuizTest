'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('colleges', {
      cid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      college_name: {
        type: Sequelize.STRING
      },
      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('colleges');
  }
};