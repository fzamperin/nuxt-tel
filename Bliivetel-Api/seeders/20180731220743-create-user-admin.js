'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Password: 1234567890
    */
   return queryInterface.bulkInsert('Usuario', [{
    email: 'teste@bliive.com.br',
    password: '$2a$12$i7WQiVTdzSkq1S2vGKaUmO6GBmK7oOL6AL5cGN0Mn1FNcCUujXYsO'
   }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Usuario', null, {});
  }
};
