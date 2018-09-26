'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Plano',
    [
      {
        nome: 'FaleMais 30',
        minutos: 30
      },
      {
        nome: 'FaleMais 60',
        minutos: 60
      },
      {
        nome: 'FaleMais 120',
        minutos: 120
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Plano', null, {});
  }
};
