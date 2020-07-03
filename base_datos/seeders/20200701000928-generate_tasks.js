'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      // Add seed commands here.
      //
      // Example:
     await queryInterface.bulkInsert('tasks', [
       { id: 1, description: 'Concluir el curso profesional de backend', createdAt: new Date(), updatedAt: new Date()},
       { id: 2, description: 'Tomar el curso de JavaScript', createdAt: new Date(), updatedAt: new Date()},
       { id: 3, description: 'Tomar el curso de BBDD', createdAt: new Date(), updatedAt: new Date()}
     ], {});
  },

  down: async (queryInterface, Sequelize) => {

     // * Add commands to revert seed here.
     // *
     // * Example:
      await queryInterface.bulkDelete('tasks', null, {});

  }
};
