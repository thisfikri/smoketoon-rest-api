'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('webtoons', [
    {
      title: "True Beauty",
      genre: 'Drama',
      image: 'https://via.placeholder.com/1020',
      status: 'unpublished',
      favourite_count: 100,
      created_by: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      title: "Age Matters",
      genre: 'Romance',
      image: 'https://via.placeholder.com/1020',
      status: 'unpublished',
      favourite_count: 100,
      created_by: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      title: "A Good Day to be a Dog",
      genre: 'Drama',
      image: 'https://via.placeholder.com/1020',
      status: 'unpublished',
      favourite_count: 100,
      created_by: 3,
      createdAt: new Date().toISOString(),
       updatedAt: new Date().toISOString()
    }
  ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('webtoons', null, {});
  }
};
