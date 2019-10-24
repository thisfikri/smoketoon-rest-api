'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('episodes', [
      {
        title: 'Episode 1',
        image: 'https://via.placeholder.com/1020',
        webtoon_id: 1,
        created_by: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'Episode 2',
        image: 'https://via.placeholder.com/1020',
        webtoon_id: 1,
        created_by: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'Episode 3',
        image: 'https://via.placeholder.com/1020',
        webtoon_id: 1,
        created_by: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'Episode 1',
        image: 'https://via.placeholder.com/1020',
        webtoon_id: 2,
        created_by: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'Episode 2',
        image: 'https://via.placeholder.com/1020',
        webtoon_id: 2,
        created_by: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'Episode 3',
        image: 'https://via.placeholder.com/1020',
        webtoon_id: 2,
        created_by: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'Episode 1',
        image: 'https://via.placeholder.com/1020',
        webtoon_id: 3,
        created_by: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'Episode 2',
        image: 'https://via.placeholder.com/1020',
        webtoon_id: 3,
        created_by: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'Episode 3',
        image: 'https://via.placeholder.com/1020',
        webtoon_id: 3,
        created_by: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('episodes', null, {});
  }
};
