'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Tasks', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Tasks', 'userId');
  }
};
