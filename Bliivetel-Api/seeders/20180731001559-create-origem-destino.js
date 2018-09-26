'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Origem_destino', [
      {
        origem: '011',
        destino: '016',
        valorminuto: 1.90
      },
      {
        origem: '016',
        destino: '011',
        valorminuto: 2.90
      },
      {
        origem: '011',
        destino: '017',
        valorminuto: 1.70
      },
      {
        origem: '017',
        destino: '011',
        valorminuto: 2.70
      },
      {
        origem: '011',
        destino: '018',
        valorminuto: 0.90
      },
      {
        origem: '018',
        destino: '011',
        valorminuto: 1.90
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Origem_destino', null, {});
  }
};
