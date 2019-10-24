'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('images', [
      {
        page: 1,
        image: 'https://via.placeholder.com/1080',
        webtoon_id: 1,
        id_episode: 1,
        created_by: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        page: 2,
        image: 'https://via.placeholder.com/1080',
        webtoon_id: 1,
        id_episode: 1,
        created_by: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        page: 3,
        image: 'https://via.placeholder.com/1080',
        webtoon_id: 1,
        id_episode: 1,
        created_by: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        page: 1,
        image: 'https://via.placeholder.com/1080',
        id_episode: 2,
        webtoon_id: 2,
        created_by: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        page: 2,
        image: 'https://via.placeholder.com/1080',
        id_episode: 2,
        webtoon_id: 2,
        created_by: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        page: 3,
        image: 'https://via.placeholder.com/1080',
        id_episode: 2,
        webtoon_id: 2,
        created_by: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        page: 1,
        image: 'https://via.placeholder.com/1080',
        id_episode: 3,
        webtoon_id: 3,
        created_by: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        image: 'https://via.placeholder.com/1080',
        id_episode: 3,
        webtoon_id: 3,
        created_by: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        image: 'https://via.placeholder.com/1080',
        id_episode: 3,
        webtoon_id: 3,
        created_by: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('images', null, {});
  }
};
