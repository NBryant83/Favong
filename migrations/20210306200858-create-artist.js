'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('artists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      strArtist: {
        type: Sequelize.TEXT
      },
      strArtistThumb: {
        type: Sequelize.TEXT
      },
      strGenre: {
        type: Sequelize.TEXT
      },
      strLabel: {
        type: Sequelize.TEXT
      },
      strWebsite: {
        type: Sequelize.TEXT
      },
      strFacebook: {
        type: Sequelize.TEXT
      },
      strTwitter: {
        type: Sequelize.TEXT
      },
      strBiographyEN: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('artists');
  }
};