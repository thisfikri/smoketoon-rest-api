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
<<<<<<< HEAD
       profile_image: '',
       createdAt: new Date().toISOString(),
       updatedAt: new Date().toISOString()
=======
       profile_image: 'default-pic'
>>>>>>> adfd8bf0ae9ea5524e32297da23cc790c616fab1
     },
     {
       email: 'arapx@xmail.com',
       password: '123456',
       name: 'arap',
<<<<<<< HEAD
       profile_image: '',
       createdAt: new Date().toISOString(),
       updatedAt: new Date().toISOString()
=======
       profile_image: 'default-pic'
>>>>>>> adfd8bf0ae9ea5524e32297da23cc790c616fab1
     },
     {
       email: 'exinos@rmail.com',
       password: '123456',
       name: 'exinos',
<<<<<<< HEAD
       profile_image: '',
       createdAt: new Date().toISOString(),
       updatedAt: new Date().toISOString()
=======
       profile_image: 'default-pic'
>>>>>>> adfd8bf0ae9ea5524e32297da23cc790c616fab1
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
