'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      uid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uname: {
        type: Sequelize.STRING
      },
      phoneno: {
        type: Sequelize.BIGINT
      },
      emailid: {
        type: Sequelize.STRING,
        //allowNull: false,
        unique:true
      },
      degree: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATEONLY
      },
      upassword: {
        type: Sequelize.STRING
      },
      cid: {
        type: Sequelize.INTEGER,
        references: {
          model:'colleges',
          key: 'cid',
        }
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
    return queryInterface.dropTable('users');
  }
};