'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class artist extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.artist.belongsToMany(models.user, { through: 'users_artists' })
        }
    };
    artist.init({
        strArtist: DataTypes.TEXT,
        strArtistThumb: DataTypes.TEXT,
        strGenre: DataTypes.TEXT,
        strLabel: DataTypes.TEXT,
        strWebsite: DataTypes.TEXT,
        strFacebook: DataTypes.TEXT,
        strTwitter: DataTypes.TEXT,
        strBiographyEN: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'artist',
    });
    return artist;
};