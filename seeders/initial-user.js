'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [{
      balance: 10000,
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { balance: 10000 });
  }
}; 