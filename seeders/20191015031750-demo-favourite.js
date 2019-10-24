'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('favourites', [
      {
        user_id: 1,
        webtoon_id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        user_id: 1,
        webtoon_id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        user_id: 1,
        webtoon_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        user_id: 1,
        webtoon_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        user_id: 1,
        webtoon_id: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        user_id: 1,
        webtoon_id: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('favourites', null, {});
  }
};
