'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('users', [
     {
       email: 'blakes@xmail.com',
       password: '123456',
       name: 'blakes',
       profile_image: ''
     },
     {
       email: 'arapx@xmail.com',
       password: '123456',
       name: 'arap',
       profile_image: ''
     },
     {
       email: 'exinos@rmail.com',
       password: '123456',
       name: 'exinos',
       profile_image: ''
     }
   ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('users', null, {});
  }
};
